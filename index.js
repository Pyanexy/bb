const { Client, Collection, MessageEmbed } = require("discord.js");
const array = [];
const { readdirSync } = require("fs");
const mongoose = require('mongoose');
const { Database } = require("quickmongo");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
const FaceBook = require("erela.js-facebook");
const client = new Client({
   intents: ["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]

});
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.db = new Database(client.config.mongourl);
client.owner = client.config.ownerID;
client.prefix = client.config.prefix;
client.embedColor = client.config.embedColor;
client.aliases = new Collection();
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.logger = require("./utils/logger.js");
client.emoji = require("./utils/emoji.json");

client.manager = new Manager({
    nodes: client.config.nodes,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
    autoPlay: true,
    plugins: [new Spotify({
        clientID: client.config.clientID,
        clientSecret: client.config.clientSecret,
    }),
            new Deezer(),
            new FaceBook()
        ],
   });

client.on("raw", (d) => client.manager.updateVoiceState(d));
/**
 * Подключение базы данных 
 */

const dbOptions = {
  useNewUrlParser: true,
  autoIndex: false,
  poolSize: 5,
  connectTimeoutMS: 10000,
  family: 4,
  useUnifiedTopology: true,
};
  mongoose.connect(client.config.mongourl, dbOptions);
  mongoose.set("useFindAndModify", false);
  mongoose.Promise = global.Promise;
	mongoose.connection.on('connected', () => {
		client.logger.log('[ДБ] ✔', "ready");
		});
	mongoose.connection.on('err', (err) => {
			console.log(`Базы данных подключена с ошибкой: \n ${err.stack}`, "error");
		});
	mongoose.connection.on('disconnected', () => {
			console.log('[ДБ] ❌');
		});
    
/**
 * Error Handler
 */
client.on("disconnect", () => console.log("Бот отключён..."))
client.on("reconnecting", () => console.log("Бот переподключается..."))
client.on('warn', error => console.log(error));
client.on('error', error => console.log(error));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

/**
 * Клиент и его мероприятия 
 */
readdirSync("./events/Client/").forEach(file => {
    const event = require(`./events/Client/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Загрузка Клиента: ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
});

/**
 * Лава линк и его мероприятия 
 */
readdirSync("./events/Lavalink/").forEach(file => {
    const event = require(`./events/Lavalink/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Загрузка лава линка: ${eventName}`, "event");
    client.manager.on(eventName, event.bind(null, client));
});

/**
 * Загрузка команд
 */
readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        client.logger.log(`Загрузка ${command.category} команда ${command.name}`, "cmd");
        client.commands.set(command.name, command);
    }
});

/**
 * для хелп селекта
 */

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "help_menu") {

        let msg = await interaction.channel.messages.fetch(interaction.message.id)

        if (interaction.values[0] === "settings") {
            await interaction.deferUpdate()

            const settingsEmbed = new MessageEmbed()
        .setTitle("Команды Редакции")
        .setDescription(
          "`autorole`, `joinchannel`, `joinmessage`, `leavechannel`, `leavemessage` `prefix`"
        )
        .setColor(client.embedColor);

      await msg.edit({ embeds: [settingsEmbed] });

            } else if (interaction.values[0] === "music") {
 
         await interaction.deferUpdate();
 
         const musicEmbed = new MessageEmbed()
         .setTitle(`Команды Музыки`)
         .setDescription("`clearqueue`, `autoplay`, `247`, `play`, `queue`, `skip`, `loop`, `nowplaying`, `leave`, `join`")
         .setColor(client.embedColor)
 
         await msg.edit({ embeds: [musicEmbed] })

        } else if (interaction.values[0] === "info") {

            await interaction.deferUpdate()

            const infoEmbed = new MessageEmbed()
        .setTitle("Команды Информации")
        .setDescription(
          "`botinfo`, `help`, `invite`, `ping`, `userinfo`, `serverinfo`"
        )
        .setColor(client.embedColor);

        await msg.edit({ embeds: [infoEmbed] })

     } else if (interaction.values[0] === "utils") {

            await interaction.deferUpdate()

            const infoEmbed = new MessageEmbed()
        .setTitle("Команды Полезность")
        .setDescription(
          "`translate`"
        )
        .setColor(client.embedColor);

        await msg.edit({ embeds: [infoEmbed] })

        }
})

client.login(client.config.token);

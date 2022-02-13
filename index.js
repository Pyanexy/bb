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
client.Database = require('./Database/Mongoose.js');
client.tools = require('./Tools/Tools.js');
client.embed = require('./Tools/Embed.js');


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
  
mongoose.connect(client.config.mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Подключён MDB')
    }).catch((err) => {
        console.log('Отключено MDB\nError: ' + err)
    })
    
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
        .setTitle("Настройка")
        .addFields(
{ name: "prefix", value: `Установите префикс для сервера` },
{ name: "joinchannel", value: `Установите канал приветствия` },
{ name: "joinmessage", value: `Установите сообщение приветствия` },
{ name: "leavechannel", value: `Установите канал прощяния` },
{ name: "leavemessage", value: `Установите сообщение прощяния` })
        .setColor(client.embedColor);

      await msg.edit({ embeds: [settingsEmbed] });

            } else if (interaction.values[0] === "music") {
 
         await interaction.deferUpdate();
 
         const musicEmbed = new MessageEmbed()
         .setTitle(`Модуль Музыка`)
         .addFields(
{ name: "play", value: `Включит музыку` },
{ name: "skip", value: `Пропустит трек` },
{ name: "stop", value: `Остановит очередь` },
{ name: "loop", value: `Цыкал очереди` },
{ name: "queue", value: `Информация о очереди` },
{ name: "lyrics", value: `Информация о тексте` },
{ name: "nowplaying", value: `Информация о проигрывымаем треке` },
{ name: "pause", value: `Пауза` },
{ name: "resume", value: `Продолжить` },
{ name: "remove", value: `Удолит трек в очереди` },
{ name: "autoplay", value: `Авто музыка` },
{ name: "247", value: `24 на 7 в войс канале` },
{ name: "filters", value: `Фильтры` },
{ name: "shuffle", value: `Информация о фильтрах` },
{ name: "seek", value: `Перемотать на нужный момент` },
{ name: "join", value: `Присоединиться` },
{ name: "clear-queue", value: `Удалить всю очередь` },
{ name: "leave", value: `Покинуть` })
         .setColor(client.embedColor)
 
         await msg.edit({ embeds: [musicEmbed] })

        } else if (interaction.values[0] === "info") {

            await interaction.deferUpdate()

            const infoEmbed = new MessageEmbed()
        .setTitle("Модуль Информация")
        .addFields(
{ name: "about", value: `Информация о Nutella` },
{ name: "stats", value: `Статистика Nutella` },
{ name: "serverinfo", value: `Информация о сервере` },
{ name: "userinfo", value: `Информация о пользователе ` },
{ name: "roleinfo", value: `Информация о роле` })
        .setColor(client.embedColor);

        await msg.edit({ embeds: [infoEmbed] })

     } else if (interaction.values[0] === "utils") {

            await interaction.deferUpdate()

            const infoEmbed = new MessageEmbed()
        .setTitle("Модуль Утилити")
              .addFields(
{ name: "translate", value: `Перевести предложение` },
{ name: "avatar", value: `Аватар пользователя` },
{ name: "calculator", value: `Калькулятор на кнопках` },
{ name: "bio", value: `Назначить биографию` },
{ name: "invite", value: `Пригласить Nutella` },
{ name: "ping", value: `Статус Api` })
        .setColor(client.embedColor);

        await msg.edit({ embeds: [infoEmbed] })

        } else if (interaction.values[0] === "fun") {
               await interaction.deferUpdate()
               
               const funEmbed = new MessageEmbed()
       .setTitle("Модуль Фан")
       .addFields(
{ name: "kiss", value: `Поцеловат пользователя` },
{ name: "hug", value: `Обнять пользователя` },
{ name: "slap", value: `Ударить пользователя` },
{ name: "sleep", value: `Спать` },
{ name: "kill", value: `Убить пользователя` },
{ name: "cry", value: `Плакать` })
       .setColor(client.embedColor);
     await msg.edit({ embeds: [funEmbed] })
  
     } else if (interaction.values[0] === "general") {
               await interaction.deferUpdate()
               
               const fuEmbed = new MessageEmbed()
       .setTitle("Модуль Основное")
       .addField("help", `Основная команда Nutella`)
       .setColor(client.embedColor);
     await msg.edit({ embeds: [fuEmbed] })
  
     }
    
 }
})

client.login(client.config.token);

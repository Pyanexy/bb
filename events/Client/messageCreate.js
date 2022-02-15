const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
   
   if (message.author.bot) return;
   if (!message.guild) return;

   client.nodb = (user) => message.channel.send(new MessageEmbed().setColor('RED').setDescription(`К сожелению **${user.tag}** нету в базе-данных.`));

  let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
  let guild = await Guild.findOne({ guildID: message.guild.id });
  if(!user) { User.create({ guildID: message.guild.id, userID: message.author.id }); message.channel.send(`\`[✅ DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`) }
  if(!guild) { Guild.create({ guildID: message.guild.id }); message.channel.send(`\`[✅ DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`); }

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**› Мой префикс на сервере: \`${prefix}\`**\n**› Все мои команды здесь: \`${prefix}\`help**`);
      message.channel.send({embeds: [embed]})
    };

   const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [ matchedPrefix ] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length || guild.prefix.length ).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    const embed = new MessageEmbed()
        .setColor("RED");

    // args: true,
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
        	reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send({embeds: [embed]});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("You can't use this command.");
        return message.channel.send({embeds: [embed]});
    }

    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription("Only <@491577179495333903> can use this command!");
        return message.channel.send({embeds: [embed]});
    }

    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setDescription("There is no player for this guild.");
        return message.channel.send({embeds: [embed]});
    }

    if (command.inVoiceChannel && !message.member.voice.channel) {
        embed.setDescription("You must be in a voice channel!");
        return message.channel.send({embeds: [embed]});
    }

    if (command.sameVoiceChannel && message.member.voice.channel !== message.guild.me.voice.channel) {
        embed.setDescription(`You must be in the same channel as ${message.client.user}!`);
        return message.channel.send({embeds: [embed]});
    }

    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
        return message.channel.send({embeds: [embed]});
    }
  }

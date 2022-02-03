const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "join",
    aliases: ["j"],
    category: "Music",
    description: "Подключение к войс каналу",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
 execute: async (message, args, client, prefix) => {
  
		const { channel } = message.member.voice;

        const emojiJoin = message.client.emoji.join;

        if(!message.guild.me.voice.channel) {
            
            const player = message.client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                volume: 50,
                selfDeafen: true,
            });

            player.connect();

            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`${emojiJoin} **Подключился к войс каналу**\nПрисоиденился <#${channel.id}> в этом канале <#${message.channel.id}>`)
             return message.channel.send({embeds: [thing]});

        } else if (message.guild.me.voice.channel !== channel) {

            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Вы не в войс канале`);
            return message.channel.send({embeds: [thing]});
        }
        
    }
};

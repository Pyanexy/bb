const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

module.exports = {
	name: "seek",
	aliases: [],
	category: "Music",
	description: "Искать текущую воспроизводимую песню",
	args: true,
    usage: "<10s || 10m || 10h>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Музыка не играет.");
            return message.channel.send({embeds: [thing]});
        }

        const time = ms(args[0])
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = message.client.emoji.forward;
        const emojirewind = message.client.emoji.rewind;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojiforward} **Вперёд**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(message.client.embedColor)
                    .setTimestamp()
                return message.channel.send({embeds: [thing]});
            } else {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojirewind} **Перемотка назад**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(message.client.embedColor)
                    .setTimestamp()
          return message.channel.send({embeds: [thing]});
            }
        } else {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Длительность поиска превышает длительность песни.\nПродолжительность песни: \`${convertTime(duration)}\``);
            return message.channel.send({embeds: [thing]});
        }
	
    }
};

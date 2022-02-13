const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "remove",
    category: "Music",
	description: "Удалить песню из очереди",
	args: false,
    usage: "<Номер песни в очереди>",
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

        const position = (Number(args[0]) - 1);
        if (position > player.queue.size) {
            const number = (position + 1);
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Нет песен под номером ${number}.\nВсего песен: ${player.queue.size}`);
            return message.channel.send({embeds: [thing]});
        }

		const song = player.queue.remove(position);

		const emojieject = message.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Удалено\n[${song.track.title}](${song.track.uri})`)
		  return message.channel.send({embeds: [thing]});
	
    }
};

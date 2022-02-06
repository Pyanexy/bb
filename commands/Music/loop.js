const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "loop",
    aliases: ['l'],
    category: "Music",
	description: "Целевой цикл песни",
	args: false,
    usage: "",
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
		
		const emojiloop = message.client.emoji.loop;

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "Вкл" : "Выкл";
			let thing = new MessageEmbed()
				.setColor(message.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojiloop} циклическая очередь сейчас **${queueRepeat}**`)
		   return message.channel.send({embeds: [thing]});
        }

        player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "Вкл" : "Выкл";
		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojiloop} Зациклить трекa сейчас **${trackRepeat}**`)
		    return message.channel.send({embeds: [thing]});
    }
};

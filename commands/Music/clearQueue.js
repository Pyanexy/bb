const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ["cq"],
    category: "Music",
  	description: "Очистить очередь",
	  args: false,
    usage: "<Укажи цифру для очистки очереди>",
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
                .setDescription("В очереди нет песен");
            return message.channel.send({embeds: [thing]});
        }

		player.queue.clear();

		const emojieject = message.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Очередь была полностью очищена`)
			  return message.channel.send({embeds: [thing]});
    }
};

const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "Возобновить воспроизведение музыки в данный момент",
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

        const emojiresume = message.client.emoji.resume;

        if (!player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojiresume} **Возоблено**.`)
                .setTimestamp()
          return message.channel.send({embeds: [thing]});
        }

        player.pause(false);

        let thing = new MessageEmbed()
            .setDescription(`${emojiresume} **Возоблено**\n[${song.title}](${song.uri})`)
            .setColor(message.client.embedColor)
            .setTimestamp()
        return message.channel.send({embeds: [thing]});
	
    }
};

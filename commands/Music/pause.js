const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "pause",
    category: "Music",
    description: "Приостановить текущую воспроизводимую музыку",
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

        const emojipause = message.client.emoji.pause;

        if (player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojipause} Действие уже выполнено.`)
                .setTimestamp()
                return message.channel.send({embeds: [thing]});
        }

        player.pause(true);

        const song = player.queue.current;

        let thing = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setTimestamp()
            .setDescription(`${emojipause} **Остоновлено**\n[${song.title}](${song.uri})`)
          return message.channel.send({embeds: [thing]});
	
    }
};

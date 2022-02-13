const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "shuffle",
    category: "Music",
    description: "Перемешать очередь",
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


        player.queue.shuffle();
        
        const emojishuffle = message.client.emoji.shuffle;

        let thing = new MessageEmbed()
            .setDescription(`${emojishuffle} Перемешал очередь`)
            .setColor(message.client.embedColor)
            .setTimestamp()
        return message.channel.send({embeds: [thing]}).catch(error => message.client.logger.log(error, "error"));
	
    }
};

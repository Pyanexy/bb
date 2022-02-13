const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "volume",
	aliases: ["v", "vol"],
	category: "Music",
	description: "Изменить громкость воспроизводимой музыки",
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
		
		const volumeEmoji = message.client.emoji.volumehigh;

		if (!args.length) {
			let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${volumeEmoji} Громкость: **${player.volume}%**`)
			return message.channel.send({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 150) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Использование: ${message.client.prefix}volume <0 - 150>`)
            return message.channel.send({embeds: [thing]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = message.client.emoji.volumehigh;
			let thing = new MessageEmbed()
				.setColor(message.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} Громкость изменена: **${volume}%**`)
		  return message.channel.send({embeds: [thing]});
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new MessageEmbed()
				.setColor(message.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} Громкость установлена на: **${volume}%**`)
		  return message.channel.send({embeds: [thing]});
		} else {
			let thing = new MessageEmbed()
				.setColor(message.client.embedColor)
				.setTimestamp()
				.setDescription(`${volumeEmoji} Громкость установлена на: **${volume}%**`)
			return message.channel.send({embeds: [thing]});
		}
		
 	}
};

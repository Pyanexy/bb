const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
	name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Показывает проигрывамыю песню",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
	 execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Музыка не играет.");
            return message.channel.send(thing);
        }

        const song = player.queue.current

        const emojimusic = message.client.emoji.music;

        // Progress Bar
        var total = song.duration;
        var current = player.position;
        var size = 10;
        var line = '—';
        var slider = '▇';

        let embed = new MessageEmbed()
            .setDescription(`${emojimusic} **Проигрывайтся**\n[${song.title}](${song.uri}) - \`[${convertTime(song.duration)}]\` [<@${song.requester.id}>]`)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor(message.client.embedColor)
            .addField("\u200b", progressbar(total, current, size, line, slider))
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
         return message.channel.send({embeds: [embed]})
            
    }
};

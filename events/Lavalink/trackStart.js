const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = async (client, player, track, payload) => {
    const channel = client.channels.cache.get(player.textChannel);
    const emojiplay = client.emoji.play;

    const thing = new MessageEmbed()
        .setDescription(`${emojiplay} **Проигрывайтся**\n [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\`\nДобавил: [<@${track.requester.id}>]`)
        .setThumbnail(track.displayThumbnail("3"))
        .setColor(client.embedColor)
        .setTimestamp()
    return channel.send({embeds: [thing]});
    
}

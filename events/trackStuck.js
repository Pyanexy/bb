const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("❌ Ошибка при загрузке песни! Трек застрял");
    channel.send({embeds: [thing]});
    client.logger.log(`Ошибка при загрузке песни! Трек застрял [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}

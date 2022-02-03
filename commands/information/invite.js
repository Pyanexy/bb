const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Information",
    aliases: [ "addme" ],
    description: "invite LavaMusic",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Пригласить")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
			new MessageButton()
    .setLabel("ГидХаб")
    .setStyle("LINK")
    .setURL("https://github.com/Pranav6966/lavalink-musicbot-with-buttons.git"),
    new MessageButton()
    .setLabel("Поддержка")
    .setStyle("LINK")
    .setURL("https://discord.gg/gfcv94hDhv")
			);

          const mainPage = new MessageEmbed()
            .setAuthor('Нутела здесь!', 'http://msurguy.github.io/gifloopcoder.com/example2.gif')
            .setThumbnail('http://msurguy.github.io/gifloopcoder.com/example2.gif')
             .setColor(client.embedColor)
            .addField('Пригласить бота', `[Здесь](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)`, true)
           message.channel.send({embeds: [mainPage], components: [row]})
    }
}

const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "about",
    category: "Information",
    aliases: [ "botinfo" ],
    description: "See description about this project",
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
    .setLabel("ГидХаю")
    .setStyle("LINK")
    .setURL("https://github.com/Pranav6966/lavalink-musicbot-with-buttons.git"),
    new MessageButton()
    .setLabel("Поддержка")
    .setStyle("LINK")
    .setURL("https://discord.gg/jgnwPGTQ6j")
			);

      const mainPage = new MessageEmbed()
            .setAuthor('Нутела здесь!', 'http://msurguy.github.io/gifloopcoder.com/example2.gif')
            .setThumbnail('http://msurguy.github.io/gifloopcoder.com/example2.gif')
            .setColor(client.embedColor)
            .addField('Разработал', '[PYANEXY#0064](https://github.com/PRANAV6966)', true)
            .addField('Сервер', '[Нутела](https://discord.gg/jgnwPGTQ6j)', true)
        return message.channel.send({embeds: [mainPage], components: [row]});
    }
}

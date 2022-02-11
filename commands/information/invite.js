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
    .setEmoji("<:Bot:940399660722442321>")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
			new MessageButton()
    .setLabel("ГидХаб")
    .setEmoji("<:github:940399694104911932>")
    .setStyle("LINK")
    .setURL("https://github.com/Pyanexy"),
    new MessageButton()
    .setLabel("Поддержка")
    .setEmoji("<:Support:940399628929630268>")
    .setStyle("LINK")
    .setURL("https://vanlink.ru/0n1ch")
			);

          const mainPage = new MessageEmbed()
            .setAuthor('Нутела здесь!', 'http://msurguy.github.io/gifloopcoder.com/example2.gif')
            .setThumbnail('http://msurguy.github.io/gifloopcoder.com/example2.gif')
             .setColor(client.embedColor)
            .addField('Пригласить бота', `[Здесь](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)`, true)
           message.channel.send({embeds: [mainPage], components: [row]})
    }
}

const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h", "pls" ],
    description: "",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
let helpMenu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder('Меню помощи')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Редакция",
          description: "Редактируй как хочешь",
          value: "settings",
          emoji: "🛠"
        },
        {
          label: "Информация",
          description: "Ты проинформирован",
          value: "info",
          emoji: "📢"
        },
        {
          label: "Музыка",
          description: "Слушай музыку 24 на 7!",
          value: "music",
          emoji: "🎵"
        },
        {
         label: "Полезность",
         description: "Может это тебе понадобится",
         value: "utils",
         emoji: "🔥"
        }
        ])
    )

    let editEmbed = new MessageEmbed()
    .setTitle('Меню помощи')
    .setDescription('Упс Nutella решила сделать селект!')
    .setColor(client.embedColor)

      message.channel.send({ embeds: [editEmbed], components: [helpMenu]})
  }
};

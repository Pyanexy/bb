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
          label: "Основное",
          description: "Самое главное в Nutella",
          value: "general",
          emoji: "🔎"
        },
        {
          label: "Информация",
          description: "Все команды информации",
          value: "info",
          emoji: "🔔"
        },
        {
          label: "Настройки",
          description: "Найстрой Nutell'у как хочешь",
          value: "settings",
          emoji: "⚙"
        },
        {
         label: "Музыка",
         description: "Слушай музыку вместе с друзьями",
         value: "music",
         emoji: "🎶"
        },
        {
         label: "Фан",
         description: "Команды развлечения тут",
         value: "fun",
         emoji: "🎭"
        }
        ])
    )

    let editEmbed = new MessageEmbed()
    .setTitle('Меню помощи')
    .setImage("https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5")
    .setDescription('Упс Nutella решила сделать селект!')
    .setColor(client.embedColor)

      message.channel.send({ embeds: [editEmbed], components: [helpMenu]})
  }
};

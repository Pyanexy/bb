const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
    name: "test",
    category: "Information",
    aliases: [ "botinfo" ],
    description: "See description about this project",
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
        ])
    )

    let editEmbed = new MessageEmbed()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor("GREEN")

      message.channel.send({ embeds: [editEmbed], components: [helpMenu]}).then(msg=>{
        setTimeout(async function () {
          await msg.delete();
        }, 180000)
      })
    }
  }
};

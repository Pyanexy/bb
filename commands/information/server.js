const Discord = require("discord.js");
const moment = require("moment");
moment.locale("ru");
module.exports = { 
name: "serverinfo", 
category: "Information", 
aliases: [ "server" ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix) => {

    //command
    const mention = message.member;
    const afk =
      message.guild.afkChannel === null ? "`Нету`" : message.guild.afkChannel;
    let servericon = message.guild.iconURL;
    let verifLevels = {
      NONE: "Нету",
      LOW: "Низкий",
      MEDIUM: "средний",
      HIGH: "(╯°□°）╯︵  ┻━┻ (Высокий)",
      VERY_HIGH: "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Очень высокий)",
    };
    let region = {
      brazil: "Бразилия",
      "eu-central": "Центральная Европа",
      singapore: "Сингапур",
      "us-central": "U.S. Центральный",
      sydney: "Сидней",
      "us-east": "U.S. Восток",
      "us-south": "U.S. Юг",
      "us-west": "U.S. Запад",
      "eu-west": "Вестер Европа",
      "vip-us-east": "вип ус евра",
      london: "Лондон",
      amsterdam: "Амстердам",
      hongkong: "Гонконг",
      russia: "Россия",
      southafrica: "Южная Африка",
      india: "Индия",
    };
    const serverembed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL())
      .setThumbnail(servericon)
      .addField(
        `Главная информация`,
        `Овнер: ${message.guild.members.cache.get(message.guild.ownerId)} \nВерификационный левел: \`${
          verifLevels[message.guild.verificationLevel]
        }\``
      )
      .addField(
        `Обзор`,
        `Всего каналов: \`${
          message.guild.channels.cache.size
        }\` \nТекст каналов: \`${
          message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size
        }\` \nВойс каналов: \`${
          message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size
        }\` \nAFK канал: ${afk} \nAFK Тайм-аут: \`${
          message.guild.afkTimeout
        } sec\` \nВсего ролей: \`${
          message.guild.roles.cache.size
        }\` \nВсего эмоции: \`${message.guild.emojis.cache.size}\``
      )
      .addField(
        `Информация о участников`,
        `Всего участников: \`${message.guild.memberCount}\` \nЛюдей: \`${
          message.guild.members.cache.filter((member) => !member.user.bot).size
        }\` \nБоты: \`${
          message.guild.members.cache.filter((member) => member.user.bot).size
        }\``
      )
      .addField(
        `Разная информация`,
        `Вы присоединились: \n\`${moment(mention.joinedAt).format(
          "dddd, MMMM Do YYYY, h:mm:ss A"
        )}\` \nСервер создан: \n\`${moment(message.guild.createdAt).format(
          "dddd, MMMM Do YYYY, h:mm:ss A"
        )}\``
      )
      .setThumbnail(message.guild.iconURL())
      .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
      .setColor(client.embedColor)
      .setTimestamp();

    message.channel.send({ embeds: [serverembed] });
  },
};

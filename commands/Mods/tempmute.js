const { MessageEmbed } = module.require("discord.js");
const ms = require("ms");
const discord = require("discord.js");

module.exports = { 
name: "tempmute", 
category: "mods", 
aliases: [ ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix) => {
    const user = message.mentions.users.first()

    const role = message.guild.roles.cache.find((ro) => ro.name === "Muted");
    if (!role) {
      message.guild.roles.create({
       
          name: "muted",
          color: 0,
 
      });
    }
    if (!user) {
      return message.channel.send("Нужно указать пользователя");
    }
    if (user.id === message.guild.owner.id) {
      return message.channel.send(
        "Вы можете использовать любую команду мода против владельца сервера."
      );
    }
    const time = args[0];
    if (!time) {
      return message.channel.send(
        "Сколько вы собираетесь заглушать этого человека ()"
      );
    }
    const reason = args.slice(1).join(" ");
    if (!reason) {
      return message.channel.send(
        "По какой причине вы собираетесь tempmute?:"
      );
    }
    const mtembde = new MessageEmbed()
      .setTitle("Действие: Tempmute")
      .setColor(client.embedColor)
      .addFields( 
{ name: "Пользователь:", value: user },
{ name: "Причина", value: reason },
{ name: "Модератор:", value: message.member.displayName },
{ name: "Время", value: time });
    const mtuembde = new MessageEmbed()
      .setTitle("ТЕБЯ ЗАГЛУШИЛИ!!")
      .setColor(client.embedColor)
      .addFields({ name: "Причина",value: reason },
  { name: "Модератор:",value: message.member.displayName },
      { name: "Время",value: time });
       user.send({ embeds: [mtuembde] });
    message.channel.send({ embeds: [mtembde] });
    user.roles.add(role);
    setTimeout(function () {
      user.roles.remove(role);
       }, ms(time));
  },
};

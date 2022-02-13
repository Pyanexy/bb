const { MessageEmbed } = require("discord.js");

module.exports = {
name: "ban",
aliases: [],
description: "Заблокировать пользователя на сервере",
category: "Mods",
used: "",
agrs: false,
permission: [],
owner: false,
execute: async (client, message, args, prefix) => {
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("У вас нет разрешения на это.");
        const user = message.mentions.users.first();
        if (!user) return message.reply(`Укажите, кого вы хотите забанить. **${prefix}ban <пользователь> [причина]**`);
        if(user.id === message.author.id) return message.reply("Вы не можете забанить себя.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});
 
        const banmessage = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${user} был забанен\nПричина: **${reason != "нету" ? reason : "нету"}**\nМодератор: ${message.author.displayName}(${message.author.tag})`);
        message.channel.send({ embeds: [banmessage] });

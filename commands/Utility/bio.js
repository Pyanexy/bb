const User = require("../../database/memberData/bio");
const { MessageEmbed } = require("discord.js");
module.exports = {
name: "bio",
aliases: [],
description: "",
category: "utils",
agrs: false,
permission: [],
owner: false,
 execute: async (client, message, args, prefix) => {

let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    if(!data) return bot.nodb();

    let context = args.slice(0).join(` `)
    
    if(!context){ data.bio = `\`\`\`<prefix>bio [Текст]\`\`\``; data.save(); message.react("🎉"); return; }

    if(context.length >= 200) return message.reply(`К сожелению я не могу поставить вам такое описание. Оно имеет ${context.length}длинну.`)

    let a = new MessageEmbed()
    .setTitle(`Вы успешно изменили свою биографию.`)
    .setDescription(context)
    .setColor(client.embedColor)
    message.channel.send({ embeds: [a] })
    data.bio = context; data.save();
    }
}
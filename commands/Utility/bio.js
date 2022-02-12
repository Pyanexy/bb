const b = require("../../database/memberData/bio");
const { MessageEmbed } = require("discord.js");

module.exports = { 
name: "bio", 
category: "utility", 
aliases: [ ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
 execute: async (message, args, client, prefix) => {
let data = await b.findOne({ guildID: message.guild.id, userID: message.author.id });
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

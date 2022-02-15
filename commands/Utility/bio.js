const { MessageEmbed } = require("discord.js");

module.exports = {
name: "bio",
aliases: [],
description: "Установите свою биографию",
category: "Utility",
args: false,
usage: "<текст>",
permission: [],
owner: false,
execute: async (client, message, args, prefix) => {
let context = args.slice(0).join(` `)
    
    if(context.length > 0) return message.reply("Биография не может быть пустым значением")
    if(context.length >= 200) return message.reply("К сожелению я не могу поставить вам такое описание. Оно имеет более 200 букв")
client.db.set(`bio_${message.author.id}`, context)
const embed = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Биография установлена!\nПрсмотреть здесь \`${prefix}user\``)
message.channel.send({embeds: [embed], react: "🎉" })
   }
} 

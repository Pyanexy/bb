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

if(!args[0]) return message.channel.send("Укажите текст Биографии")

let context = args.slice(0).join(" ")
if(!context.length >= 200) return message.reply("Биография не может быть длиннее 200 букв")
client.db.set(`bio_${message.author.id}`, context)
const embed = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Биография установлена!\nПрсмотреть здесь \`${prefix}userinfo\``)
message.channel.send({embeds: [embed], react: "🎉" })
   }
} 

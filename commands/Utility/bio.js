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

if(!args[0]) return message.reply("Твоя биография:" + await client.db.get(`bio_${message.author.id}`) || "нету")

let context = args.slice(0).join(" ")
if(!context.length >= 200) return message.reply("Биография не может быть длиннее 200 букв")
client.db.set(`bio_${message.author.id}`, context)
const embed = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Биография установлена!\nПрсмотреть здесь \`${prefix}userinfo\``)
message.reply({embeds: [embed], react: "🎉" })
   }
} 

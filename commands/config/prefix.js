const { MessageEmbed } = require("discord.js"); 

const { default_prefix } = require(`${process.cwd()}/config.json`)
module.exports = { 
name: "setprefix", 
category: "Config", 
description: "Установить камтомный префикс", 
args: false, 
usage: "", 
aliases: ["prefix"], 
permission: [], 
owner: false, 
async execute(message, args, client) { 

if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('У вас нет `Manage Guild` права для использования этой команды. '); 

if (!args[0]) { 
const embed = new MessageEmbed() 
.setDescription("Вы не указали значения нового префикса") 
.setColor(client.embedColor) 
return message.channel.send({ embeds: [embed] }); } 

if (args[1]) { 
const embed = new MessageEmbed() 
.setDescription("Вы не указали аргумент") 
.setColor(client.embedColor) 
return message.channel.send({ embeds: [embed] }); } 

if (args[0].length > 3) { 
const embed = new MessageEmbed() 
.setDescription("Значение префикса не может привышать 3 символов") 
.setColor(client.embedColor) 
return message.channel.send({ embeds: [embed] }); } 

let data = await Guild.findOne({ guildID: message.guild.id })

        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`Вы успешно сменили префикс бота на \`${args[0]}\``)
        message.channel.send({ embeds: [embed] }).then(() => {
        message.react("✔")
       })

        data.prefix = args[0]; data.save();
     },
};

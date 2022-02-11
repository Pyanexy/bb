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
const ex1 = new MessageEmbed() // Создаём наш эмбэд 
.setColor('#43e2f7') // Цвет нашего сообщения 
.setTitle('Приветик :>') // Название эмбэд сообщения 
.setAuthor(message.guild.name) // Автором будет название сервера 
.setDescription(':^Мы любим вас!^:') // комментарий 
.setTimestamp() // Дата отправки сообщения 
.setFooter('Ваш бот © 2021'); 

const selectMenu = new MessageSelectMenu() 
.setCustomId('select') 
.setPlaceholder('Ничего') 
.addOptions([ { 
label: 'Первый', 
description: 'Описание', 
value: `Первый` 
// Как сюда embed подставить??
 }, 
{ 
label: 'Второй', 
  description: 'Описание2', 
  value: `Второй` }, ]) 
.setMaxValues(1); 
const menu = new MessageActionRow() 
.addComponents(selectMenu); 
message.channel.send({content: 'ЫЫ', components: [menu]}); 
    
  }
};

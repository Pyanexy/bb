const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = { 
name: "mute", 
category: "Mods", 
description: "Заглушет пользователя на время", 
args: false, 
usage: "<string>", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("У вас недостаточно прав для выполнения этой команды.");
  let muteUser = message.mentions.members.first();
  if(!muteUser) return message.channel.send("Не указан пользователь | **Использование:** `n!mute @user <время> <причина>`");
  if(muteUser.permissions.has("ADMINISTRATOR")) return message.reply("Ты не можешь заглушить администратора!");  
  let reason = args.slice(2).join(" ");
  if(!reason) return message.channel.send("Укажите причину | **Использование:** `n!mute @user <время> <причина>`");

  let muterole = message.guild.roles.cache.find(r => r.name === "Заглушен")
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        name: "Заглушен",
        color: client.embedColor,
        permissions:[]
      });

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      
    }catch(e){
      console.log(e.stack);
    }
  }
  let length = args[1];
  let time = ms(length);
  if(isNaN(time)) return message.reply(`Буквы не цифры`);
  if(!length) return message.channel.send(`**Использование:** \`${prefix}mute @user <время> <причина>\``);
  message.delete().catch();

  let muteLogEmbed = new MessageEmbed()
  .setAuthor(`Заглушен | ${muteUser.user.tag} `, muteUser.user.displayAvatarURL)
  .setDescription(`**Пользователь:** ${muteUser}\n \n**Модератор:** ${message.author}\n \n**Причина:** ${reason}\n \n**Время:** ${length}\n \n**Было в:** ${message.channel}`)
  .setColor(client.embedColor)
  .setTimestamp()
  .setFooter(`ID: ${muteUser.id}`)

  if(client.db.get(`channel_${message.guild.id}`) == "null") {
    message.channel.get(client.db.get(`channel_${message.guild.id}`)).send({ embeds: [muteLogEmbed] })
} else { message.channel.send({ embeds: [muteLogEmbed] })}

  await(muteUser.roles.add(muterole.id));

  setTimeout(function(){
    muteUser.roles.remove(muterole.id);

    let unmuteLogEmbed = new MessageEmbed()
    .setAuthor(`Разглушен | ${muteUser.user.tag} `, muteUser.user.displayAvatarURL)
    .setDescription(`**Пользователь:** ${muteUser}\n \n**Модератор:** ${client.user}\n \n**Причина:** ${reason}`)
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter(`ID: ${muteUser.id}`)
   
   if(client.db.get(`channel_${message.guild.id}`) == "null") {
    message.channel.get(client.db.get(`channel_${message.guild.id}`)).send({ embeds: [unmuteLogEmbed] })
} else { message.channel.send({ embeds: [unmuteLogEmbed] })}

  }, ms(length));
}}

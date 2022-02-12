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
    
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("У вас недостаточно прав для выполнения этой команды.");
  let muteUser = message.mentions.users.first() || message.guild.members.get(args[0]);
  if(!muteUser) return message.channel.send("Не удалось найти пользователя | **Использование:** `${prefix}tempmute @user <время> <причина>`");
  if(muteUser.permissions.has("ADMINISTRATOR")) return message.channel.send("У вас нет права `ADMINISTRATOR`");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.channel.send("Укажите причину | **Использование:** `${prefix}tempmute @user <время> <причина>`");

  let muterole = message.guild.roles.cache.find(r => r.name === "Заглушен")
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        name: "Заглушен",
        color: "0",
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
  if(!length) return message.channel.send("**Использование:** `${prefix}tempmute @user <время> <причина>`");
  message.delete().catch();

  let muteLogEmbed = new Discord.RichEmbed()
  .setAuthor(`Заглушен | ${muteUser.user.tag}`, muteUser.user.displayAvatarURL)
  .setDescription(`**Заглушен:** ${muteUser}\n \n**Админестратор:** ${message.author}\n \n**Причина:** ${reason}\n \n**Время:** ${length}`)
  .setColor(client.embedColor)
  .setTimestamp()
  .setFooter(`ID: ${muteUser.id}`)

  
  
  await(muteUser.addRole(muterole.id));

  setTimeout(function(){
    muteUser.removeRole(muterole.id);

    let unmuteLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Разглушен | ${muteUser.user.tag} `, muteUser.user.displayAvatarURL)
    .setDescription(`**Разглушен:** ${muteUser}\n \n**Админестратор:** ${bot.user}\n \n**Причина:** ${reason}`)
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter(`ID: ${muteUser.id}`)


  }, ms(length));

   }
}

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
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You have insufficient permissions to execute this command.");
  let muteUser = message.mentions.members.first();
  if(!muteUser) return message.channel.send("Couldn't find user | **Usage:** `>mute @user <time> <reason>`");
  if(muteUser.permissions.has("ADMINISTRATOR")) return message.reply("You can't ban an Administrator!");  
  let reason = args.slice(2).join(" ");
  if(!reason) return message.channel.send("Specify a reason | **Usage:** `>mute @user <time> <reason>`");

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
  .setAuthor(`Punishment | ${muteUser.user.tag} | Mute`, muteUser.user.displayAvatarURL)
  .setDescription(`**Target:** ${muteUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${reason}\n \n**Issued Duration:** ${length}\n \n**Issued In:** ${message.channel}`)
  .setColor("#e74c3c")
  .setTimestamp()
  .setFooter(`ID: ${muteUser.id}`)

  
  message.channel.send({ embeds: [muteLogEmbed] }).then(() => {
    muteUser.send(`You've been **muted** in **${message.guild.name}** for reason: **${reason}**, and duration: **${length}**`).catch(err => console.log(err))
    message.channel.send(`${muteUser} has been **muted** for **${length}**.`)
})
  await(muteUser.roles.add(muterole.id));

  setTimeout(function(){
    muteUser.roles.remove(muterole.id);

    let unmuteLogEmbed = new MessageEmbed()
    .setAuthor(`Punishment | ${muteUser.user.tag} | Unmute`, muteUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${muteUser}\n \n**Removed By:** ${client.user}\n \n**Issued Reason:** Expired/False\n \n**Issued In:** Console`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter(`ID: ${muteUser.id}`)

    message.channel.send({ embeds: [unmuteLogEmbed] }).then(() => {
      muteUser.send(`Your **mute** in **${message.guild.name}** has **expired**. You may now talk.`).catch(err => console.log(err))
  })
;

  }, ms(length));
}}

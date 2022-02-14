const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = { 
name: "mute", 
category: "Mods", 
description: "Команда заглушить", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix) => {
//mod channel 
 if(!args[0]) return message.reply("Выберите тип: \`text || voice\`");
    if(args.slice(0) == "text") {
     if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You have insufficient permissions to execute this command.");
  let muteUser = message.mentions.members.first();
  if(!muteUser) return message.channel.send("Couldn't find user | **Usage:** `>mute @user <time> <reason>`");
  if(muteUser.permissions.has("ADMINISTRATOR")) return message.channel.send(":clown: You tried. :clown:");
  let reason = args.slice(3).join(" ");
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
  let length = args[2];
  if(isNaN(ms(length))) return message.channel.send("Укажите время. **Использование:** `n!mute @user <время> <причина>`");
  message.delete().catch();

 
  await(muteUser.roles.add(muterole.id));

setTimeout(function(){
    muteUser.roles.remove(muterole.id);
   
}, ms(length));
} else if(args.slice(0) == "voice") {

 const member = message.mentions.members.first();

 if(message.member.permissions.has("MUTE_MEMBERS")) return message.reply("У вас нет на это разрешения.");
 if(member.permissions.has("ADMINISTRATOR", "MANAGE_GUILD", "MUTE_MEMBERS", "MANAGE_MESSAGES")) return message.reply("Вы не можете заглушить этого пользователя");
 if(message.member.roles.highest.position < member.roles.highest.position ) return message.reply("Ваша роль ниже егошний роли");
 if(member.voice.selfMute || member.voice.mute) return message.reply("Пользователь уже заглушен");
 if(!member.voice.channel) return message.reply("Пользователь не находится в войс канале");
 const reason = args.slice(1).join(" ")
 if(!reason) return message.reply("Укажите причину");

 await member.voice.setMute(true, reason).then(() => {
            
                    let embed = new MessageEmbed()
                        .setAuthor({name:`${message.author.username} ${message.member.nickname ? `(${message.member.nickname})` : ""}`, iconURL: `${message.user.avatarURL()}`})
                        .setTitle("Пользователь заглушен")
                        .setColor(client.embedColor)
                        .setDescription(`Причина: ${reason}`)
                        .addFields(
                            {name: "Заглушен", value: `${member}`, inline: true},
                            {name: "Модератор", value:`${message.member}`, inline: true},
                        )
                        .setTimestamp();
                    message.channel.send({embeds: [embed]});
})

  }
}
}

module.exports = { 
name: "unmute", 
category: "Mods", 
description: "Команда кик", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix) => {
//mod channel 
if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`У вас недостаточно прав для выполнения этой команды.`);
const users = message.mentions.members.first();
const unmute = message.guild.roles.cache.find( r => r.name == "Заглушен")
users.roles.remove(unmute.id)
message.channel.send(`С ${users} сняты ограничения`) 
 }
}

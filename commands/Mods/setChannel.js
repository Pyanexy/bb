module.exports = {
    name: "channel",
    category: "Mods",
    description: "Мод-лог",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

 //mod channel 
if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`У вас недостаточно прав для выполнения этой команды.`);

let channel = args.slice(0).join(` `)
if(!channel > 0) return message.reply(`${client.db.get(`channel_${message.guild.id}`) || `На сервере не указан канал для мод логов`}`)
if(isNaN(channel)) return message.reply(`Ведите ID канала`)
client.db.set(`channel_${message.guild.id}`, channel )
message.channel.send(`Канал установлен: <#${channel}>\nИндификатор канала: ${channel}`) 
  }
}

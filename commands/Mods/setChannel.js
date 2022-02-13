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

const channel = message.mentions.channels.first();
if(!channel) return message.reply(`${client.db.get(`channel_${message.guild.id}`) || `На сервере не указан канал для мод логов`}`)
let context = args.slice(0).join(` `)
if(isNaN(context)) return message.reply(`Ведите ID канала`)
client.db.set(`channel_${message.guild.id}`, context )
message.channel.send(`Канал установлен: ${channel}\nИндификатор канала: ${channel.id}`) 
  }
}

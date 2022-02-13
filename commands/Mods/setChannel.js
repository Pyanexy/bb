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
if(!channel) return message.reply(`Вы не указали канал для мод логов.`)

client.db.set(`channel_${channel}`)
message.channel.send(`Канал установлен: ${channel}`) 
  }
}

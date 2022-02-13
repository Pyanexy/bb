const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    category: "Mods",
    description: "Команда Бан",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("У вас нет разрешения на это.");
        const user = message.mentions.users.first();
        if (!user) return message.reply(`Укажите, кого хотите забанить. **${prefix}ban <пользователь> [причина]**`);
        if(user.id === message.author.id) return message.reply("Вы не можете забанить себя.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({ reason: reason });
 
        const kickmessage = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${user} был забанен.\nПричина: **${reason != "Нету" ? reason : "Нету"}**\nМодератор: ${message.member.displayName}(${message.author.tag})`);
        message.channel.send({ embeds: [kickmessage] });
   }
}

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    category: "Mods",
    description: "Команда кик",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("У вас нет разрешения на это.");
        const user = message.mentions.users.first();
        if (!user) return message.reply(`Укажите, кого хотите выгнать. **${prefix}kick <пользователь> [причина]**`);
        if(user.id === message.author.id) return message.reply("Вы не можете выгнать себя.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick(reason);
 
        const kickmessage = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${user} был выгнан.\nПричина: **${reason != "Нету" ? reason : "Нету"}**\nМодератор: ${message.member.displayName}(${message.author.tag})`);
        message.channel.send({ embeds: [kickmessage] });
   }
}

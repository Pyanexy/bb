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
        if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply("You do not have permission to do that.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please specify someone you want to mute. **!mute <user> [time] [reason]**");
        const target = message.guild.members.cache.get(user.id);
        const muterole = message.guild.roles.cache.find(r => r.name === "Заглушен") 
 try: {
 if(!muterole) {
  message.guild.roles.create({
  name: "Заглушен",
  permission: [],
  color: client.embedColor,
});
 }}
        if(user.id === message.author.id) return message.reply("You cannot mute yourself.");
        if(target.roles.cache.has(mutedrole)) return message.reply("This user has already been muted.");
        if(!mutedrole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(2).join(" ");
        let time = args[1];
        if (!time) time = "1h";

        target.roles.add(mutedrole.id);
        const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${user} has been muted by ${message.author} for ${ms(ms(time))}.\nReason: **${reason != "" ? reason : "-"}**`)

        message.channel.send({ embeds: [embed] });
        
        setTimeout(() => {
            target.roles.remove(mutedrole.id);
            const unmute = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${user} has been unmuted.`);
            message.channel.send({ embeds: [unmute] });
        }, ms(time));
}}

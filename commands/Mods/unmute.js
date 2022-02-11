const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = { 
name: "unmute", 
category: "mods", 
aliases: [ ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [],
 owner: false, 
execute: async (message, args, client, prefix, Discord) => {
        const member = message.mentions.members.first();
        let target = message.guild.members.cache.get(member.id)
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')

        target.roles.remove(role.id);
        message.reply('Размьючен!')


    }
}

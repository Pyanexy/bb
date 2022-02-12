const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = { 
name: "mute", 
category: "mod", 
aliases: [ ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix, Discord) => {

        const member = message.mentions.users.first();
        let time = args[1];
        const reason = args.slice(2).join(' ');
        const role = message.guild.roles.cache.find(role => role.name === 'Muted)

        if (!member) return message.reply('Укажите пользователя!');
        if (!time) return message.reply('Укажите время!');
        if (!reason) return message.reply('Укажите причину');

        if (member.id === message.author.id) return message.reply('Вы не можете замьютить себя!')
        if (member.id === client.id) return message.reply('Нельзя!')

        if (!role) {
            try {
                message.channel.send('Нет приглушенной роли.. создаю ее..!')
                let muterole = await message.guild.roles.create({
                 
                        name: 'Muted,
                        permissions: [],
                   
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send(
                    new MessageEmbed()
                    .setDescription('Приглушенная роль успешно создана')
                    .setColor("GREEN")
                )
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(role => role.name === 'Muted)
        if (member.roles.cache.has(role2)) return message.reply('Пользователь уже отключен! ')

        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Вы не можете заглушить этого пользователя')


        await member.roles.add(role2)
     const mtembde = new MessageEmbed()
      .setTitle("Действие: Tempmute")
      .setColor(client.embedColor)
      .addField("Пользователь:", user)
      .addField("Причина", reason)
      .addField("Модератор:", message.member.displayName)
      .addField("Время", time, true);
message.channel.send({ embeds: [mtembde] });

const mtuembde = new MessageEmbed()
      .setTitle("ТЕБЯ ЗАГЛУШИЛИ!!")
      .setColor(client.embedColor)
      .addField("Причина", reason)
      .addField("Модератор:", message.member.displayName)
      .addField("Время", time, true);
        setTimeout(() => {
            member.roles.remove(role2)
   
          member.send({ embeds: [mtuembde] });
        }, ms(time))

    }



}

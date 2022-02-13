const { MessageEmbed } = require('discord.js')

module.exports = { 
name: "reroll", 
category: "Giveaway", 
description: "Определить другово победителя", 
args: false, 
usage: "", 
aliases: [], 
permission: [], 
owner: false, 
async execute(message, args, client) {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('У вас недостаточно прав!')

        if(!args[0]) return message.channel.send('Пожалуйста, укажите идентификатор сообщения')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args[0]);
        if(!giveaway) return message.channel.send('Не удалось найти подарок.')

        client.giveaways.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send("Розыгрыш повторен");
            })
            .catch(err => {
                console.log(err)
            })
    }
}

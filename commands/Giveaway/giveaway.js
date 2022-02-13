const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = { 
name: "giveaway", 
category: "Giveaway", 
description: "Начать Раздачу", 
args: false, 
usage: "", 
aliases: [], 
permission: [], 
owner: false, 
async execute(message, args, client) {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('У вас недостаточно прав!')
        
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send('Укажите канал')

        const duration = args[1]
        if(!duration) return message.channel.send('Введите допустимую продолжительность')

        const winners = args[2]
        if(!winners) return message.channel.send('Укажите количество победителей')

        const prize = args.slice(3).join(" ")
        if(!prize) return message.channel.send('Пожалуйста, укажите приз, чтобы выиграть')

        client.giveaways.start(channel, {
            time : ms(duration),
            prize : prize,
            winnerCount: winners,
            hostedBy: client.config.hostedBy ? message.author : null,
            messages: {
                giveaway: (client.config.everyoneMention ? "@everyone\n\n" : '') + "Раздача",
                giveawayEnd: (client.config.everyoneMention ? "@everyone\n\n" : '') + "Раздача закончилась",
                timeRemaining: "Время раздачи **{duration}**",
                inviteToParticipate: "Нажмите на 🎉 чтобы участвовать в раздаче",
                winMessage: "Поздравляем {winners}, вы выиграли розыгрыш",
                embedFooter: "Giveaway Time!",
                noWinner: "Не удалось определить победителя",
                hostedBy: 'Раздачу начал {user}',
                winners: "Победители",
                endedAt: 'Заканчивается в',
                units: {
                    seconds: "секунд",
                    minutes: "минут",
                    hours: 'часов',
                    days: 'дней',
                    pluralS: false
                }
            },
           
        })
        message.channel.send(`Раздача начинается здесь ${channel}`)
    }
}

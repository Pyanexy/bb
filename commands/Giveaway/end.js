const ms = require('ms')

module.exports = {
    name : 'end',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('У вас недостаточно прав!')
        if(!args[0]) return message.channel.send('Пожалуйста, укажите идентификатор сообщения')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args.join(" "))
        if(!giveaway) return message.channel.send('Раздача не найдена')

        client.giveaways.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(()  => {
            message.channel.send(`Розыгрыш закончится менее чем ${client.giveaway.options.updateCountdownEvery / 1000} Секунд`)
        }).catch(err => {
            console.log(err)
            message.channel.send('An error occured')
        })
        
    }
}

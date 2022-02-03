const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "status",
    category: "Information",
    aliases: [ "stats" ],
    description: "Информация о боте",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
       const duration1 = moment.duration(message.client.uptime).format(" Д [Дней], Ч [часов], м [минут], с [секунд]");
        const cpu = await si.cpu();
        const about = message.client.emoji.about;
        const embed = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setThumbnail(message.client.user.displayAvatarURL())
            .setDescription(`${about} **Статус**
**= Статистика =**
**• Гильдий** : ${message.client.guilds.cache.size.toLocaleString()}
**• Каналов** : ${message.client.channels.cache.size.toLocaleString()}
**• Пользователей** : ${message.client.users.cache.size.toLocaleString()}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**= Система =**
**• Платформа** : ${os.type}
**• Время работы** : ${duration1}
**• КПУ** :
> **• Ядро** : ${cpu.cores}
> **• Модуль** : ${os.cpus()[0].model} 
> **• Скорость** : ${os.cpus()[0].speed} МХз(MHz)
**• Память** :
> **• Вся память** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Мбпс
> **• Свободная память** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Мбпс
> **• Всего кучи(Heap)** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Мбпс
> **• Используется кучи(Heap)** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Мбпс
`);
         message.channel.send({embeds: [embed]});
    }
}

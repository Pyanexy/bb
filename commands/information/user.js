const Discord = module.require("discord.js");
const moment = require("moment");
moment.locale("ru");

module.exports = {
    name: "userinfo",
    category: "Information",
    aliases: [ "ui", "user", "u" ],
    description: "See description about this project",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        const permissions = {
            "ADMINISTRATOR": "Админестратор",
            "MANAGE_GUILD": "Управлять сервером",
            "MANAGE_ROLES": "Управлять ролями",
            "MANAGE_CHANNELS": "Управлять каналами",
            "KICK_MEMBERS": "Выпнуть участника",
            "BAN_MEMBERS": "Забанить участника",
            "MANAGE_NICKNAMES": "Управлять никнеймоми",
            "MANAGE_EMOJIS": "Управлять эмоциями",
            "MANAGE_WEBHOOKS": "Управлять вебхуком",
            "MANAGE_MESSAGES": "Отправлять сообщения",
            "MENTION_EVERYONE": "Упомянуть всех"
        }
 
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "Никто" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "Никто" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "Никто" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "Никто",
            "DISCORD_EMPLOYEE": "Discord сотрудник",
            "DISCORD_PARTNER": "Discord партнёр",
            "BUGHUNTER_LEVEL_1": "Искатель ошибок (левел 1)",
            "BUGHUNTER_LEVEL_2": "Искатель ошибок (левел 2)",
            "HYPESQUAD_EVENTS": "События Hypesquad",
            "HOUSE_BRILLIANCE": "Виликолепие Brilliance",
            "HOUSE_BRAVERY": "Храбрость HypeSquad",
            "HOUSE_BALANCE": "Баланс HypeSquad",
            "EARLY_SUPPORTER": "Ранний сторонник",
            "TEAM_USER": "Пользователь команды",
            "VERIFIED_BOT": "Верифицырованый бот",
            "EARLY_VERIFIED_DEVELOPER": "Ранний проверенный разработчик ботов"
        };

        const userlol = new Discord.MessageEmbed()
        .setAuthor(`Информация о пользователе`, mention.user.avatarURL())
        .setThumbnail(usericon)
        .setDescription(await client.db.get(`bio_${mention.id}`) || "Биография отсутствует")
        .addField(`Главная информация`, `Имя: \`${mention.user.username}\` \nТег: \`${mention.user.discriminator}\` \nНикнейм: \`${nick}\``)
        .addField(`Обзор`, `Значки: \`${flags[mention.user.flags.toArray().join(", ")]}\``)
        .addField(`Информация о сервере`, `Роли: <@&${mention._roles.join(">  <@&") || `Нету` }> \nКлючевые разрешения: \`${finalPermissions.join(', ')}\``)
        .addField(`Разная информация`, `Авторизирован: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nПресоиденился: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
        .setTimestamp()
        .setColor(client.embedColor);
        message.channel.send({ embeds: [userlol] })
    }
}

module.exports = { 
name: "mute", 
category: "Mods", 
description: "Команда заглушить", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix) => {
//mod channel 
    let isMod = message.guild.roles.cache.find(r => r.name == "Заглушен")

        if (!isMod && !message.member.permissions.has("MUTE_MEMBERS") ) {
            return message.reply({
                content: "У вас нет на это разрешения!",
                ephemeral: true,
            });
        }

        let member = message.mentions.members.first();
        let reason = args.slice(2).join(' ');

        if(member.user.id === message.author.id) {
            return message.reply({
                content: "Вы не можете модерировать себя!",
                ephemeral: true,
            });
        } else if(member.user.id === client.user.id) {
            return  message.reply({
                content: "Вы не можете модерировать меня!",
                ephemeral: true,
            });
        } else if(member.user.id === message.guild.ownerId) {
            return message.reply({
                content: "Вы не можете модерировать владельца сервера!",
                ephemeral: true,
            });
        }

        if(message.member.roles.highest.position < member.roles.highest.position) {
            return message.reply({
                content: "Вы не можете заглушить кого-то с более высокой ролью, чем вы!",
                ephemeral: true,
            });
        }


        if(!member.manageable) {
            return message.reply({
                content: "Я не могу отключить этого пользователя!",
                ephemeral: true,
            });
        }

        if(!member.voice.channel) {
            return message.reply({
                content: "Этот пользователь не находится на голосовом канале!",
                ephemeral: true,
            });
        }

        if(member.voice.selfMute || member.voice.mute) {
            return message.reply({
                content: "Этот пользователь уже отключен!",
                ephemeral: true,
            });
        }

        await member.voice.setMute(true, reason).then(async () => {
            
                    let embed = new MessageEmbed()
                        .setAuthor({name:`${message.user.username} ${message.member.nickname ? `(${message.member.nickname})` : ""}`, iconURL: `${message.user.avatarURL()}`})
                        .setTitle("Пользователь заглушен")
                        .setColor(client.embedColor)
                        .setDescription(`Причина: ${reason}`)
                        .addFields(
                            {name: "Заглушен", value: `${member}`, inline: true},
                            {name: "Модератор", value:`${message.member}`, inline: true},
                        )
                        .setTimestamp();
                    message.channel.send({embeds: [embed]});
               }

            

            
 }
}

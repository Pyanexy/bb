const Discord = require("discord.js"),

module.exports.send = async function(client, message, embed){
    let newEmbed = new Discord.MessageEmbed()
    .setFooter(`©️ Nutella`)
    .setColor(client.embedColor)
    embed = {... newEmbed, ... embed}

    return message.channel.send({embeds: [embed]});

};

module.exports.usage = async function(message, data){
    let cmd = data.cmd;
    let usageDesc = await cmd.usage.join("\n").replace(/{prefix}/g, data.guild.prefix);

    let newEmbed = new Discord.MessageEmbed()
    .setFooter('©️ Nutella')
    .setColor("RED")
    .setAuthor("О нет!", message.author.displayAvatarURL())
    
    .addField("Использование", usageDesc);

    return message.channel.send({embeds: [newEmbed]});

};

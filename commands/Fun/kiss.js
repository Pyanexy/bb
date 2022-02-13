const discord = require("discord.js");
const random = require("something-random-on-discord");

module.exports = { name: "kiss", category: "Fun", description: "Изменение префикса или сброс", args: false, usage: "", aliases: ["prefix"], permission: [], owner: false, 
async execute(message, args, client) {
    
    let target = message.mentions.members.first()
    
    let data = await random.getAnimeImgURL("kiss");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    
    .setFooter(`${message.author.username} целует ${target.user.username}`)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] });
  }
}

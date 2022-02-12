const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = { name: "hug", category: "Fun", aliases: [  ], description: "See description about this project", args: false, usage: "", permission: [], owner: false, 
execute: async (message, args, client, prefix) => {
    
    let target = message.mentions.members.first()
    
    let data = await random.getAnimeImgURL("hug");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    
    .setFooter(`${message.author.username} Обнимает ${target.user.username}`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};

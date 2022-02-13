const discord = require("discord.js");
const random = require("something-random-on-discord");

module.exports = { name: "cry", category: "Fun", aliases: [  ], description: "See description about this project", args: false, usage: "", permission: [], owner: false, 
execute: async (message, args, client, prefix) => {
    
    let data = await random.getAnimeImgURL("cry");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    
    .setFooter(`${message.author.username} плачет`)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] });
  }
};

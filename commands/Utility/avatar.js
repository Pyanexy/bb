const discord = require("discord.js");

module.exports = { 
name: "avatar", 
category: "utility", 
aliases: [ "ava" ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
 execute: async (message, args, client, prefix) => {
let user = message.mentions.users.first() || message.author;
    let embed = new discord.MessageEmbed()
      .setColor(client.embedColor)
      .setTitle(`${user.username}'s Аватарка`)
      .setDescription(
        `[Аватар](${user.displayAvatarURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};

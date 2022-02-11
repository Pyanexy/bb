const discord = require("discord.js");
const translate = require('@iamtraction/google-translate');

module.exports = { 
name: "translate", 
category: "utility", 
aliases: [ "t" ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
 execute: async (message, args, client, prefix) => {
        const txt = args.slice(1).join(" ")
        const lang = args[0]
        if(!lang) return message.channel.send("Укажите ISO-код языка.")
        if(!txt) return message.channel.send("Предоставьте текст для перевода.")
        translate(txt, { to: lang }).then(res => {
          const embed = new discord.MessageEmbed()
          .setDescription(res.text)
          .setColor(client.embedColor)
          message.channel.send({ embeds: [embed] });
    }).catch(err => {
      message.channel.send("Укажите действительный код языка ISO.")
    });
  },
};

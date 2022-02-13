const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")
moment.locale("ru")

module.exports = { 
name: "github", 
category: "utility", 
aliases: [ "git" ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
execute: async (message, args, client, prefix) => {

       try {

  if (!args[0]) return message.channel.send(`Пожалуйста введите никнейм`)
    
  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send(`Юзер не найден !`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

            const embed = new MessageEmbed()
            .setAuthor(`${login} Информация `, avatar_url)
            .setColor(client.embedColor)
            .setThumbnail(`${avatar_url}`)
            .addField(`Юзер`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Биография`, `${bio || "Нету"}`)
            .addField(`Публичные репазитории`, `${public_repos || "Нету"}`, true)
            .addField(`Подписчиков`, `${followers}`, true)
            .addField(`Подписок`, `${following}`, true)
            .addField(`Место расположения`, `${location || "Нету"}`)
            .addField(`Авторизирован `, moment(created_at).format("dddd, MMMM, Do YYYY"))
            .setFooter(`Искал он ${message.author.username}`)

            message.channel.send({ embeds: [embed] })

    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
               }
    }
};

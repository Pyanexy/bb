const Discord = module.require("discord.js");
const simplydjs = require("simply-djs")

module.exports = { 
name: "calculator", 
category: "Utility", 
aliases: [ "cal" ], 
description: "Калькулятор для быстрого счёта", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
 execute: async (message, args, client, prefix) => {
    simplydjs.calculator(message, {
    embedColor: client.embedColor,
    embedFooter: `${message.guild.name}`,
    })
  },
};

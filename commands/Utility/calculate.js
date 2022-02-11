const Discord = module.require("discord.js");
const simplydjs = require("simply-djs")

module.exports = { 
name: "calculator", 
category: "utility", 
aliases: [ "cal" ], 
description: "See description about this project", 
args: false, 
usage: "", 
permission: [], 
owner: false, 
 execute: async (message, args, client, prefix) => {
    simplydjs.calculator(message, {
    embedColor: client.embedColor,
    })
  },
};

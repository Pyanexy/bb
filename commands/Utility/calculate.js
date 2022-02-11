const Discord = module.require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
  name: "calculator",
  description: "calculates.",
  aliases: [ "cal" ],
  category: "utility",
  agrs: true,
  owner: false,
  permission: [],

  execute: async (client, message, args, prefix) => {
    simplydjs.calculator(message, {
    embedColor: client.embedColor,
    })
  },
};

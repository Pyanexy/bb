const prefixModel = require("../../database/guildData/leavemessage");

module.exports = {
    name: "leavemessage",
    category: "Config",
    description: "Изменение префикса или сброс",
    args: false,
    usage: "",
    aliases: ["leavemsg"],
    permission: [],
    owner: false,
    async execute(message, args, client) {
    const text = args.join(" ");
    if (!args[0]) {
      return message.channel.send(`\`Usage: n!leavemessage <Text|off>\``);
    }
    if (text !== "off") {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });
        let newData = new prefixModel({
          ByeMsg: args.join(" "),
          GuildID: message.guild.id,
        });
        newData.save();
        message.channel.send(`Leave Message set to \n${newData.ByeMsg}`);
      } else if (!data) {
        let newData = new prefixModel({
          ByeMsg: args.join(" "),
          GuildID: message.guild.id,
        });
        newData.save();
        message.channel.send(`Leave Message set to \n${newData.ByeMsg}`);
      }
    } else if (text === "off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        return message.channel.send(`Leave Message has been turned off!`);
      } else if (!data2) {
        return message.channel.send(`Leave Message isn't setup!`);
      }
    }
  },
};

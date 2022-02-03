const { MessageEmbed } = require("discord.js");

const { default_prefix } = require(`${process.cwd()}/config.json`)
module.exports = {
    name: "setprefix",
    category: "Config",
    description: "Изменение префикса или сброс",
    args: false,
    usage: "",
    aliases: ["prefix"],
    permission: [],
    owner: false,
    async execute(message, args, client) {
      
      if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('У Вас нет `Управлять Сервером` этого права ');
 if (!args[0]) {
    const embed = new MessageEmbed()
        .setDescription("Вы не указали аргумент!")
        .setColor(client.embedColor)
      return message.channel.send({ embeds: [embed] });
    }

    if (args[1]) {
       const embed = new MessageEmbed()
        .setDescription("Вы не указали аргумент!")
        .setColor(client.embedColor)
      return message.channel.send({ embeds: [embed] });
    }

    if (args[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("Вы можете вести до 3 значений!")
        .setColor(client.embedColor)
      return message.channel.send({ embeds: [embed] });
    }

    if (args.join("") === default_prefix) {
      client.db.delete(`prefix_${message.guild.id}`);
      const embed = new MessageEmbed()
        .setDescription("Префикс сброшен")
        .setColor(client.embedColor)
      return await message.channel.send({ embeds: [embed] });
    }

    client.db.set(`prefix_${message.guild.id}`, args[0]);
    const embed = new MessageEmbed()
       .setDescription(`Префикс изменён на: ${args[0]}`)
       .setColor(client.embedColor)
    await message.channel.send({ embeds: [embed] });
  },
};

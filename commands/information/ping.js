const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "Информация о пинге",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
  
    const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
    const latency = `\`\`\`ini\n[ ${Math.floor(message.createdTimestamp - timestamp)}мс ]\`\`\``;
    const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}мс ]\`\`\``;
      const embed = new MessageEmbed()
      .setTitle(`Понг?`)
      .setDescription('')
      .addField('Локальное', latency, true)
      .addField('Локальное айпи', apiLatency, true)
      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())   
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();
    message.channel.send({embeds: [embed]});
  }
};

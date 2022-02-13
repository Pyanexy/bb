const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bio",
    category: "Utility",
    description: "Установить биографию",
    args: false,
    usage: "",
    aliases: [],
    permission: [],
    owner: false,
    async execute(message, args, client, prefix) {
      
       if (!args[0]) {
    const embed = new MessageEmbed()
        .setDescription(`${client.db.bio || `Вы можете установить что-то сюда используя ${prefix}bio ваш тек`}`)
        .setColor(client.embedColor)
      return message.channel.send({ embeds: [embed] });
    }


    if (args[0].length > 200) {
       const embed = new MessageEmbed()
        .setDescription("Биография может достигать до 200 символов, не больше")
        .setColor(client.embedColor)
      return message.channel.send({ embeds: [embed] });
    }
    
   if (args.join("-") === "") {
      client.db.delete(`bio_${message.author.id}`);
      const embed = new MessageEmbed()
        .setDescription("Биография сброшена")
        .setColor(client.embedColor)
      return await message.channel.send({ embeds: [embed] });
    }

    client.db.set(`bio_${message.author.id}`, agrs[0]) 
   const embed = new MessageEmbed()
   .setDescription(`Ура, вы установили свою биографию, посмотреть можно здесь \`${prefix}userinfo\``)
   .setColor(client.embedColor)
   message.react("🎉");
   message.channel.send({ embeds: [embed] })
   }
}

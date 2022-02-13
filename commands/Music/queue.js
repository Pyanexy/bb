const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "queue",
    category: "Music",
    aliases: ["q"],
    description: "Показать очередь музыки и сейчас играет.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
   execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Музыка не играет.");
            return message.channel.send({embeds: [thing]});
        }

        const queue = player.queue;

        const emojiQueue = message.client.emoji.queue;

        const embed = new MessageEmbed()
            .setColor(message.client.embedColor)
      
        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        if (queue.current) embed.addField("Сейчас играет", `[${queue.current.title}](${queue.current.uri}) \`[${convertTime(queue.current.duration)}]\``);

        if (!tracks.length) embed.setDescription(`${page > 1 ? `страница ${page}` : "очередь"}.`);
        else embed.setDescription(`${emojiQueue} Лист очереди\n` + tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) \`[${convertTime(track.duration)}]\``).join("\n"));

        const maxPages = Math.ceil(queue.length / multiple);

        embed.addField("\u200b", `страница ${page > maxPages ? maxPages : page} из ${maxPages}`);

        return message.channel.send({embeds: [embed]});
    }
};

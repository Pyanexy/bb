const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const { readdirSync } = require("fs");
const {
    button_pagination
} = require('../../utils/button');

module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h" ],
    description: "Список всех комманд",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
       
        let cots = [];
        let cots2 = [];
        if (!args[0]) {

            //categories to ignore
            let ignored = [
                "Owner"
            ];

            const emo = {
                config: "⚙️",
                information: "ℹ️",
                music: "🎵",
                
            }

            readdirSync('./commands').map(async (dir) => {
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                let cmds = commands.map(e => {
                    let obyy = new Object();

                    e = e.replace('.js', '');

                    obyy = {
                        name: `\`${e}\``,
                        value: `Используйте \`${prefix}${e}\``,
                        inline: true
                    }

                    return obyy
                })

                let uwu = {
                    dir,
                    cmdd: cmds
                }

                cots2.push(uwu);
            });

            let embeds = [];

            cots2.forEach(cot => {

                const embed = new MessageEmbed()
                    .setTitle(`${cot.dir.charAt(0).toUpperCase() + cot.dir.slice(1)} Команда!`)
                    .setDescription(`Используете \`${prefix}help\` и ведите название любой команды в боте.\nПример: \`${prefix}help ping\`.\n\n`)
                    .setColor(client.embedColor)

                cot.cmdd.forEach(ecmdd => {
                    embed.addFields(ecmdd)
                })

                embeds.push(embed);
            });

            await button_pagination(message, embeds);

        } else {

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );


            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Команда не существует! Используете \`${prefix}help\` для просмотра всех команд!`)
                    .setColor("RED");
                return await client.sendEmbed(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Команда и её детали:")
                .addField(
                    "Команда:",
                    command.name ? `\`${command.name}\`` : "Не опозноно."
                )
                .addField(
                    "Адиас(ы):",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "Вторичные не опознаны."
                )
                .addField(
                    "Использование:",
                    command.usage ?
                    `\`${prefix}${command.name} ${command.usage}\`` :
                    `\`${prefix}${command.name}\``
                )
                .addField(
                    "Описание команды:",
                    command.description ?
                    command.description :
                    "Не найдено."
                )
                .setFooter(
                    `Использовал ${message.member.displayName}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(client.embedColor);
            return await message.channel.send({embeds: [embed]});
        }
    },
};

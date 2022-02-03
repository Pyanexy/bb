module.exports = async (client, guild) => {
	client.users.fetch("532710970938884106").then(user => {
        user.send(`🔔 Присоединился: ${guild.name} (${guild.id}) - ${guild.members.cache.size} Участников `);
	})
}

const { prefix } = require("../../config.json");

module.exports = async (client) => {

    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} Sudah online!`, "ready");
    client.logger.log(`Запущены ${client.guilds.cache.size} серверов, в общей сложности ${client.users.cache.size} пользователи`, "ready");

    //Game
    client.user.setActivity({ 
status: "idle",
activities: [{
name: "музыке", 
type: "COMPETING"
}]
});

}

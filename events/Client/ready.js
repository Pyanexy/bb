const { prefix } = require("../../config.json");

module.exports = async (client) => {

    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} Sudah online!`, "ready");
    client.logger.log(`Запущены ${client.guilds.cache.size} серверов, в общей сложности ${client.users.cache.size} пользователи`, "ready");

    //Game
    let statuses = ['музыке', `префикс: ${prefix}`];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: "COMPETING"});
  	}, 10000)

}

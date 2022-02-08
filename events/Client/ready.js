const { prefix } = require("../../config.json");

module.exports = async (client) => {

    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} В сети!`, "здесь");
    client.logger.log(`Запущены ${client.guilds.cache.size} серверов, и вот столько ${client.users.cache.size} юзеров `, "ready");

    //Game
    let statuses = ['Привет!', `Префикс : ${prefix}`];
    setInterval(function() {
  		let activ = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity( activ , {type: "COMPETING" });
  	}, 10000)
client.user.setPresence({
    status: "idle"
});
}

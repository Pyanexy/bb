const { prefix } = require("../../config.json");

module.exports = async (client) => {

    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} В сети!`, "здесь");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    //Game
    let statuses = ['Привет!', `Префикс : ${prefix}`];
    setInterval(function() {
  		let activ = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setPresence({ status: "idle", activity: [{ status, {type: "PLAYING"}]});
  	}, 10000)

}

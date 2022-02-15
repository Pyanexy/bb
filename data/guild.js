const client = require("../index.js");

const schema = mongoose.Schema({
    guildID: String,
    prefix: { type: String, default: client.config.prefix },
});
module.exports = mongoose.model("Guild", schema)

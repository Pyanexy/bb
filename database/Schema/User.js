const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    bio: { type: String, default: `<prefix>bio текст` },
}));

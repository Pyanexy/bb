const mongoose = require('mongoose'); 

const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    
    
    bio: { type: String, default: `<prefix>bio [Текст]` }
});
module.exports = mongoose.model("User", schema)

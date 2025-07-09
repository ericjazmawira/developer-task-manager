const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{tpe:String, required: true, unique},
    password: {type:String, required: true},
    role: {type:String, enum: ["developer", "admin"], default:"developer"}
})

module.exports = mongoose.model("User", userSchema);

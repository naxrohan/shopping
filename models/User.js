const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username : {type: String, require: true, unique: true},
        email : {type: String, require: true, unique: true},
        password : {type: String, require: true},
        isAdmin: {
            type: Boolean,
            default: false
        },
        img: {type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
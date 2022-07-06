const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema(
    {
        title: { type: String, require: true, unique: true},
        shortDesc: {type: String},
        img: { type: String, required: true},
        bgColor: { type: String},
        ctaLink: { type: String},
        isActive: { type: Boolean, default: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Slide", slideSchema);
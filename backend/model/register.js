const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    created_by: String,
    img_url: String,
    address: String,
    hobbies: String,
    gender: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model(
    "register",
    registerSchema,
    "registrationDetails"
);

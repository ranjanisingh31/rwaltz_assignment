const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    created_by: String,
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

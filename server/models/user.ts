import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    shippingAddress: {
        type: String,
    }
});

module.exports = mongoose.model("User", userSchema);
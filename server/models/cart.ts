import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
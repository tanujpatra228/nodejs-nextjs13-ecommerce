import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    itemname: {
        type: String,
        required: true,
    },
    salerate: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    finalrate: {
        type: Number,
    },
    catid: {
        type: String,
    },
    category: {
        type: String,
    },
    subcatid: {
        type: String,
    },
    subcategory: {
        type: String,
    },
    itemqty: {
        type: String,
    },
    itemimage: {
        type: String,
    },
    itemsize: {
        type: Array,
    }
});

module.exports = mongoose.model('Product', ProductSchema);
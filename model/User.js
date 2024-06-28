const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    mobile_no: {
        required: true,
        type: String,
        unique: true,
        match: /^([+]\d{2}[ ])?\d{10}$/,
    },
}, { timestamps: true })

const userCollection = mongoose.model('users', schema)

module.exports = userCollection
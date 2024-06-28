const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    post_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts" 
    },
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users" 
    },

}, { timestamps: true })

const likeCollection = mongoose.model('likes', schema)

module.exports = likeCollection
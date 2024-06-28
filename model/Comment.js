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
        ref: "posts" 
    },
    message:{
        required: true,
        type: String,
    }

}, { timestamps: true })

const commentCollection = mongoose.model('comments', schema)

module.exports = commentCollection
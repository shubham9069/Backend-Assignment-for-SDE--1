const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    comment_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments" 
    },
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users" 
    },
    message: {
        required: true,
        type: String,
    }

}, { timestamps: true })

const repliedCommentCollection = mongoose.model('replied_comments', schema)

module.exports = repliedCommentCollection
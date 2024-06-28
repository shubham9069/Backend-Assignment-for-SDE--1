const mongoose = require('mongoose')
const mediaSchema = new mongoose.Schema({
    name:String,
    type:String,
    link:String,
})

const schema = new mongoose.Schema({
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    text_field: {
        required: true,
        type: String,
    },
    media: {
        type: [mediaSchema],
        default: []
    },
    hashtag: [String],

}, { timestamps: true })

const postCollection = mongoose.model('posts', schema)

module.exports = postCollection
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    follower_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users" 
    },
    followee_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users" 
    },

}, { timestamps: true })

const connectionCollection = mongoose.model('connections', schema)

module.exports = connectionCollection
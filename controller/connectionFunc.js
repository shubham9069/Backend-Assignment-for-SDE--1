const connectionCollection = require('../model/FollowerFollowee')
const jwt = require('jsonwebtoken')
const ObjectId = require("mongoose").Types.ObjectId;


async function followUser(req, res) {
    const { followee_id } = req.body;
    console.log(req.user_id)
    const follower_id = req.user_id
    try {
        const response = await connectionCollection.create({ follower_id, followee_id })
        if (response._id) {
            return res.json({ status: 'success', data: response })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function getUserFollowing(req, res) {
    let { page_size, per_page } = req.query
    const follower_id = req.user_id
    per_page = Number(per_page)
    page_size = Number(page_size)
    try {
        const response = await connectionCollection.aggregate([
            { $match: { follower_id: new ObjectId(follower_id) }},
           { $lookup: { 
                from:"users",
                localField:"followee_id",
                foreignField:"_id",
                as: "followee_details"
            }
        }
         ]).skip(page_size * per_page).limit(per_page)
        
        return res.json({ status: 'success', data: response })

    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function getUserFollower(req, res) {
    let { page_size, per_page } = req.query
    const follower_id = req.user_id
    per_page = Number(per_page)
    page_size = Number(page_size)
    try {
        const response = await connectionCollection.aggregate([
            { $match: { followee_id: new ObjectId(follower_id) }},
           { $lookup: { 
                from:"users",
                localField:"follower_id",
                foreignField:"_id",
                as: "followee_details"
            }
        }
         ]).skip(page_size * per_page).limit(per_page)
        
        return res.json({ status: 'success', data: response })

    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}


module.exports = { followUser, getUserFollowing, getUserFollower }
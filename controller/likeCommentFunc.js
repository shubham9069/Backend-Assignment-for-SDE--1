


const likeCollection = require('../model/Like')
const commentCollection = require('../model/Comment')
const replyCollection = require('../model/RepliedComment')
const ObjectId = require("mongoose").Types.ObjectId;


async function likePost(req, res) {
    const { post_id } = req.body;
    let user_id = req.user_id
    try {
        const response = await likeCollection.create({ user_id, post_id })
        if (response._id) {
            return res.json({ status: 'success', data: response })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function commentPost(req, res) {
    const { post_id, comment, } = req.body;
    let user_id = req.user_id
    try {
        const response = await commentCollection.create({ user_id, post_id, message: comment })
        if (response._id) {
            return res.json({ status: 'success', data: response })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function replyCommentPost(req, res) {
    const { comment_id, message } = req.body;
    let user_id = req.user_id
    try {
        const response = await replyCollection.create({ user_id, comment_id, message })
        if (response._id) {
            return res.json({ status: 'success', data: response })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function getCommentPost(req, res) {
    let { user_data = '0', page_size = 0, per_page = 10 } = req.query
    const { post_id } = req.body;
    page_size = Number(page_size)
    per_page = Number(per_page)

    try {

        let response
        if (user_data == '1') {
            response = await commentCollection.aggregate([
                { $match: { post_id: new ObjectId(post_id) } },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user_details"
                    }
                }
            ]).skip(per_page * page_size).limit(per_page)
        } else {
            response = await commentCollection.find({ post_id }).skip(per_page * page_size).limit(per_page)
        }


        return res.json({ status: 'success', data: response })

    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function getParentCommentPost(req, res) {
    let { comment_id } = req.query

    try {
        const response = await replyCollection.aggregate([
            { $match: { _id: new ObjectId(comment_id) } },
            {
                $lookup: {
                    from: "comments",
                    localField: "comment_id",
                    foreignField: "_id",
                    as: "parent_comments"
                }
            }
        ])
       
        return res.json({ status: 'success', data: response })
        

    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}


module.exports = { likePost, commentPost, replyCommentPost, getCommentPost, getParentCommentPost }
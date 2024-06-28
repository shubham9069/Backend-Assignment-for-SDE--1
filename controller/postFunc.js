const postCollection = require('../model/Post')



async function createPost(req, res) {
    const { text_field,hashtag=[],media=[] } = req.body;
    const user_id = req.user_id
    try {
        const response = await postCollection.create({ text_field, hashtag, media, user_id })
        if (response._id) {
            return res.json({ status: 'success', data: response })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function updatePost(req, res) {
    const { text_field,hashtag=[],media=[],post_id } = req.body;
    try {
        const response = await postCollection.updateOne({ _id: post_id },{ text_field, hashtag, media, })
        if (response.acknowledged) {
            return res.json({ status: 'success', data: response })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function deletePost(req, res) {
    const { delete_flag = '0',post_id } = req.query;
    if (delete_flag == '0') {
        return res.json({ status: 'error', message: "dont have access to delete " })
    }
    try {

        const response = await postCollection.deleteOne({ _id: post_id })
        if (response?.acknowledged) {
            return res.json({ status: 'success', message: "post has been delete" })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function getPostByText(req, res) {
     const { search_text,page_size=1, per_page=10 } = req.query

    try {

        const response = await postCollection.find({ text_field: { $regex: search_text, $options:'i'}}).skip(per_page* page_size).limit(per_page)

            return res.json({ status: 'success', data: response})
        
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function getPostByTags(req, res) {
    let { tags = [], page_size = 1, per_page = 10 } = req.query
    if (typeof tags === 'string') {
    tags = JSON.parse(tags) 
    }

    try {

        const response = await postCollection.find({hashtag:{$in:tags}}).skip(per_page * page_size).limit(per_page)

        return res.json({ status: 'success', data: response })

    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}


module.exports = { createPost, updatePost, deletePost, getPostByText, getPostByTags }
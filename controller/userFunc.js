const userCollection = require('../model/User')
const jwt = require('jsonwebtoken')


async function createUser(req, res) {
    const { name, email, mobile_no } = req.body;

    try {
        const response = await userCollection.create({ name: name.trim(), email, mobile_no })
        if (response._id) {
            return res.json({ status: 'success', data: response })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function updateUser(req, res) {
    const { name, email, mobile_no } = req.body;

    try {
        const response = await userCollection.updateOne({ _id: req.user_id }, { $set: { name, email, mobile_no } })
        if (response.acknowledged) {
            return res.json({ status: 'success', message: "data updated successfully" })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function deleteUser(req, res) {
    const { delete_flag = '0' } = req.query;
    if (delete_flag == '0') {
        return res.json({ status: 'error', message: "dont have access to delete " })
    }
    try {

        const response = await userCollection.deleteOne({ _id: req.user_id })
        if (response?.acknowledged) {
            return res.json({ status: 'success', message: "data has been delete" })
        }
    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function getUser(req, res) {
    const { sort_by, page_size, per_page } = req.query
    try {
        const response = await userCollection.find({}).skip(per_page * page_size).limit(per_page).sort({ [sort_by]: 1 })

        return res.json({ status: 'success', data: response })

    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function searchUser(req, res) {
    // we did indexing 
    const { search_text } = req.query
    try {
        const response = await userCollection.find({ name: { $regex: new RegExp('^' + search_text), $options: 'i' } }).sort({ name: 1 })

        return res.json({ status: 'success', data: response })

    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}
async function loginUser(req, res) {
    // we did indexing 
    const { mobile, otp } = req.body
    try {
        // check user present in  db or not 
        const checkUser = await userCollection.findOne({ mobile_no: mobile })
        if (!checkUser) {
            throw new Error("user not exist please signup")
        }

        const accessToken = jwt.sign(
            { "user_id": checkUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30d' }
        )

        res.cookie("user_id", checkUser._id, { maxAge: 1000 * 24 * 60 * 60 * 365 });
        return res.json({ status: 'success', data: checkUser, access_token: accessToken })


    } catch (err) {
        return res.status(400).json({ status: 'error', error: err.message })
    }

}

module.exports = { createUser, updateUser, getUser, deleteUser, searchUser, loginUser }
const express = require('express');
const { createPost, updatePost, deletePost, getPostByTags,getPostByText } = require('../controller/postFunc');
const cookieParser = require('cookie-parser');
const middleware = require('../middleware');
const router = express.Router();
router.use(cookieParser())

router.post('/create-post', middleware, createPost )
router.patch('/update-post', middleware, updatePost )
router.get('/delete-post', middleware, deletePost )

router.get('/get-post-tags', middleware, getPostByTags )
router.get('/get-post-text', middleware, getPostByText )







module.exports = router

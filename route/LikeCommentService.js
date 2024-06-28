const express = require('express');
const { likePost, replyCommentPost, commentPost, getCommentPost, getParentCommentPost } = require('../controller/likeCommentFunc');
const cookieParser = require('cookie-parser');
const middleware = require('../middleware');
const router = express.Router();



// here count of like and comment of each post  is store into a redis 
router.post('/like', middleware,likePost)
router.post('/comment', middleware,commentPost)

router.post('/get-comment', middleware,getCommentPost)

router.post('/reply-comment', middleware, replyCommentPost)
router.get('/get-parent-comment', middleware, getParentCommentPost)



module.exports = router

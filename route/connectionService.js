const express = require('express');
const { followUser, getUserFollower, getUserFollowing } = require('../controller/connectionFunc');
const cookieParser = require('cookie-parser');
const middleware = require('../middleware');
const router = express.Router();
router.use(cookieParser())



router.post('/follow-user', middleware,followUser)
router.get('/get-user-follower', middleware,getUserFollower)
router.get('/get-user-following', middleware, getUserFollowing)











module.exports = router

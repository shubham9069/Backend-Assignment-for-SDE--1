const express = require('express');
const { followUser, getUserFollower, getUserFollowing } = require('../controller/connectionFunc');
const cookieParser = require('cookie-parser');
const middleware = require('../middleware');
const router = express.Router();
router.use(cookieParser())


// you can use redis for storing the no of count of follower and follwing of each user 
// user:{
//     [656754cdtc78drcdcdc]:{
//         followers:221,
//         following:3123
//     }
// }
router.post('/follow-user', middleware,followUser)
router.get('/get-user-follower', middleware,getUserFollower)
router.get('/get-user-following', middleware, getUserFollowing)











module.exports = router

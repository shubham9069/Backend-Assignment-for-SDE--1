const express = require('express');
const { createUser, deleteUser, updateUser, getUser, searchUser, loginUser } = require('../controller/userFunc');
const cookieParser = require('cookie-parser');
const middleware = require('../middleware');
const router = express.Router();
router.use(cookieParser())

router.post('/create-user', createUser)
router.put('/update-user', middleware,updateUser)
router.get('/delete-user', middleware, deleteUser)
router.get('/get-user', getUser)
router.get('/search-user', searchUser)
router.post('/login', loginUser)









module.exports = router

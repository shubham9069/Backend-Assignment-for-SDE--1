const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
require("dotenv").config();
const mongoose = require("mongoose");
const userService = require("./route/userService");
const connectionService = require("./route/connectionService");
const postService = require("./route/postService");


const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to mongoo !"))
    .catch((err) => console.log(err));


// user service 
app.use('/v1/user', userService)  
// followers 
app.use('/v1/connection', connectionService)
// post   
app.use('/v1/post', postService)


app.get("/health-check", async function (req, res) {
    return res.json({ status: 200, message: "100 % working " })
});


app.listen(PORT, () => console.log(`Server Running..${PORT}`));



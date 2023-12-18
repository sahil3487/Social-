const express = require('express')
const {createPost} =  require("../controllers/post Controller ")

const router = express.Router();

router.route("/post/upload").post(createPost)

module.exports = router
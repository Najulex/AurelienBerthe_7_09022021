const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.get("/post/:username", postCtrl.getUserPosts);

module.exports = router;

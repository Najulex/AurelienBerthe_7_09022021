const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:username", auth, postCtrl.getUserPosts);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;

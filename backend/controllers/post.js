const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	dialect: "mysql",
	host: dbConfig.HOST,
});

const PostModel = require("../models/Post");
const Post = PostModel(sequelize, Sequelize);

exports.createPost = (req, res, next) => {
	let url;
	if (req.file) {
		url = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
	} else {
		url = "NULL";
	}
	Post.create({
		username: req.body.username,
		title: req.body.title,
		text: req.body.text,
		imageUrl: url,
	})
		.then(() => res.status(200).json({ message: "Post créé" }))
		.catch((error) => res.status(501).json(error));
};

exports.getAllPosts = (req, res, next) => {
	Post.findAll({ order: [["createdAt", "DESC"]] })
		.then((posts) => res.status(200).json({ posts }))
		.catch((error) => res.status(500).json({ error }));
};

exports.getUserPosts = (req, res, next) => {
	Post.findAll({ where: { username: req.params.username } })
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(500).json(error));
};

const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	dialect: "mysql",
	host: dbConfig.HOST,
});

const PostModel = require("../models/Post");
const Post = PostModel(sequelize, Sequelize);

exports.createPost = (req, res, next) => {
	Post.create({
		username: req.body.username,
		text: req.body.text,
		title: req.body.title,
		imageUrl: req.body.imageUrl,
	})
		.then(() => res.status(200).json({ message: "Post créé" }))
		.catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
	Post.findAll({ order: [["createdAt", "DESC"]] })
		.then((posts) => res.status(200).json({ posts }))
		.catch((error) => res.status(500).json({ error }));
};

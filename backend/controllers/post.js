const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");
const fs = require("fs");

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

exports.deletePost = (req, res, next) => {
	Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			const filename = post.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Post.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: "Post supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.updatePost = (req, res, next) => {
	Post.findOne({ id: req.params.id }).then((post) => {
		if (req.file) {
			const filename = post.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				post
					.update({
						title: req.body.title,
						text: req.body.text,
						imageUrl: `${req.protocol}://${req.get("host")}/images/${
							req.file.filename
						}`,
					})
					.then(() => res.status(200).json({ message: "Post modifié !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		} else {
			post
				.update({
					title: req.body.title,
					text: req.body.text,
				})
				.then(() => res.status(200).json({ message: "Post modifié !" }))
				.catch((error) => res.status(400).json({ error }));
		}
	});
};

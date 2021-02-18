const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	dialect: "mysql",
	host: dbConfig.HOST,
});

const UserModel = require("../models/User");
const User = UserModel(sequelize, Sequelize);

exports.signup = (req, res, next) => {
	if (req.body.username.length > 20) {
		return res.status(500).json({ error: "Nom d'utilisateur trop long" });
	} else {
		if (req.body.email.match(/.{1,}@[^.]{1,}/g)) {
			let pwd = req.body.password;
			if (
				pwd.match(/[0-9]/g) &&
				pwd.match(/[A-Z]/g) &&
				pwd.match(/[a-z]/g) &&
				pwd.length >= 8
			) {
				User.findOne({ where: { username: req.body.username } })
					.then((user) => {
						if (!user) {
							bcrypt
								.hash(req.body.password, 10)
								.then(function (hash) {
									User.create({
										username: req.body.username,
										email: req.body.email,
										password: hash,
									})
										.then(() =>
											res.status(201).json({ message: "Utilisateur créé" })
										)
										.catch((err) => res.status(500).json({ err }));
								})
								.catch((err) => res.status(500).json({ error }));
						} else {
							return res
								.status(400)
								.json({ error: "Nom d'utilisateur déja utilisé" });
						}
					})
					.catch((error) => res.status(500).json({ error }));
			} else {
				return res.status(500).json({
					error:
						"Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
				});
			}
		} else {
			return res
				.status(500)
				.json({ error: "Merci d'utiliser une adresse mail valide" });
		}
	}
};

exports.login = (req, res, next) => {
	User.findOne({
		where: {
			username: req.body.username,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({
					error:
						"Utilisateur introuvable, veuillez vérifier votre nom d'utilisateur",
				});
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(400).json({ error: "Mot de passe incorrect" });
					}
					res.status(200).json({
						userId: user.id,
						token: jwt.sign(
							{ userId: user.id },
							"xMOlpW5568wRZ27JUamdsj1VfZNI14",
							{ expiresIn: "24h" }
						),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(501).json({ error }));
};

exports.account = (req, res, next) => {
	User.findOne({ id: req.params.id })
		.then((user) => {
			if (!user) {
				return res.status(400).json({ error: "user not found" });
			}
			return res.status(200).json({ user });
		})
		.catch(() => res.status(500).json({ error: "pb connexion" }));
};

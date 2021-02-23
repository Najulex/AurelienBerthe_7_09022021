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
	let pwd = req.body.password;
	let username = req.body.username;
	let email = req.body.email;
	if (username.length > 20) {
		return res.status(500).json({ error: "Nom d'utilisateur trop long" });
	}
	if (!email.match(/.{1,}@[^.]{1,}/g)) {
		return res
			.status(500)
			.json({ error: "Merci d'utiliser une adresse mail valide" });
	}
	if (
		!pwd.match(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,30})$/g
		)
	) {
		return res.status(500).json({
			error:
				"Votre mot de passe doit contenir entre 8 et 30 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
		});
	}
	User.findOne({ where: { username: username } })
		.then((user) => {
			if (!user) {
				bcrypt
					.hash(pwd, 10)
					.then(function (hash) {
						User.create({
							username: username,
							email: email,
							password: hash,
						})
							.then(() => res.status(201).json({ message: "Utilisateur créé" }))
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
						username: user.username,
						token: jwt.sign(
							{ userId: user.id },
							"xMOlpW5568wRZ27JUamdsj1VfZNI14",
							{ expiresIn: "12h" }
						),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(501).json({ error }));
};

exports.account = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, "xMOlpW5568wRZ27JUamdsj1VfZNI14");
	const userId = decodedToken.userId;
	User.findByPk(userId)
		.then((user) => {
			if (!user) {
				return res.status(400).json({ error: "Utilisateur non trouvé" });
			}
			return res.status(200).json(user);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, "xMOlpW5568wRZ27JUamdsj1VfZNI14");
	const userId = decodedToken.userId;
	User.destroy({ where: { id: userId } })
		.then(() =>
			res.status(200).json({
				message:
					"Votre compte a bien été supprimé, merci d'avoir utilisé notre application et à bientôt.",
			})
		)
		.catch((error) => res.status(500).json({ error }));
};

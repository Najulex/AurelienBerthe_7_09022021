const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	dialect: "mysql",
	host: dbConfig.HOST,
});

const UserModel = require("../models/User");
const User = UserModel(sequelize, Sequelize);

exports.signup = (req, res, next) => {
	User.findOne({ where: { username: req.body.username } })
		.then((user) => {
			if (user) {
				return res
					.status(400)
					.json({ error: "Nom d'utilisateur non disponible" });
			}
		})
		.catch((error) => res.status(500).json({ error }));
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	})
		.then(() => res.status(201).json({ message: "user created" }))
		.catch((err) => res.status(500).json({ err }));
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
			if (req.body.password !== user.password) {
				return res.status(400).json({ error: "Mot de passe incorrect" });
			}
			return res.status(200).send({ user, auth: true });
		})
		.catch((error) => res.status(501).json({ error }));
};

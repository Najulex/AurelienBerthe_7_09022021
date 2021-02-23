const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const dbConfig = require("./config/db-config");
const path = require("path");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	dialect: "mysql",
	host: dbConfig.HOST,
});

try {
	sequelize.authenticate();
	console.log("Connecté à la base de données MySQL!");
} catch (error) {
	console.error("Impossible de se connecter, erreur suivante :", error);
}

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

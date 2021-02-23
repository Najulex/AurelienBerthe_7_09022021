const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decodedToken = jwt.verify(token, "xMOlpW5568wRZ27JUamdsj1VfZNI14");
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "ID d'utilisateur invalide !";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Requète invalide !"),
		});
	}
};

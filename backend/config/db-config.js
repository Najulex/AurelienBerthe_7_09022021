module.exports = {
	HOST: "localhost",
	USER: "admin",
	PASSWORD: "GP_ad_PWD_2021",
	DB: "groupomania",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

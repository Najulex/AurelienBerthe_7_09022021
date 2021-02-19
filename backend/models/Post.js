module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"Post",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{}
	);
};

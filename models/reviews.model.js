const { db } = require('../utils/db.util');
const { DataTypes } = require('sequelize');

const Review = db.define('review', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	gameId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active'
	}
});

module.exports = { Review };
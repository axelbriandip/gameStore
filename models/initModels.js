// Models
const { Console } = require('./consoles.model');
const { Game } = require('./games.model');
const { Review } = require('./reviews.model');
const { User } = require('./users.model');

const initModels = () => {
    // 1 User <-> M Review
	User.hasMany(Review, { foreignKey: 'userId' });
	Review.belongsTo(User);
    // 1 Game <-> M Review
	Game.hasMany(Review, { foreignKey: 'gameId' });
	Review.belongsTo(Game);
    // M Game <-> M Review
	Game.hasMany(Console, { foreignKey: 'gameId' });
	Console.hasMany(Game, { foreignKey: 'consoleId' });
};

module.exports = { initModels };
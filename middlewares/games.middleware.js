// Model
const { Game } = require('../models/games.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const gameExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const game = await Game.findOne({
		where: { id }
	});

	// If game doesn't exist..
	if (!game) {
		return next(new AppError('Game not found', 404));
	}

	req.game = game;
	next();
});

module.exports = {
	gameExists,
};
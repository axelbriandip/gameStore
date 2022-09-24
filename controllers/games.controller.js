// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { Game } = require('../models/games.model');
const { Review } = require('../models/reviews.model');
const { Console } = require('../models/consoles.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');

const createGame = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;

	const newGame = await User.create({
        title, genre
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newGame },
	});
});

const getAllGames = catchAsync(async (req, res, next) => {
    const games = await Game.findAll({
        include: [
            { model: Console },
            { model: Review }
        ]
	});

	res.status(200).json({
		status: 'success',
		data: { games },
	});
});

const changeTitle = catchAsync(async (req, res, next) => {
    const { title } = req.body;
	const { game } = req;

	await game.update({ title });

	res.status(200).json({
		status: 'success',
		data: { game },
	});
});

const disabledGame = catchAsync(async (req, res, next) => {
    const { game } = req;

	// Soft delete
	await game.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
    const { comment } = req.body;
    const { gameId } = req.params;
    const { sessionUser } = req;

	const newReview = await Review.create({
        userId: sessionUser.id,
        gameId,
        comment
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newReview },
	});
});

module.exports = {
    createGame,
    getAllGames,
    changeTitle,
    disabledGame,
    createReview
};
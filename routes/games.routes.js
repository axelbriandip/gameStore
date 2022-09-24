const express = require('express');

// router
const gamesRouter = express.Router();

// Controllers
const {
    changeTitle,
    createGame,
    createReview,
    disabledGame,
    getAllGames
} = require('../controllers/games.controller');

// Middlewares 
const { gameExists } = require('../middlewares/games.middleware');

const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middleware');

const {
	createGameValidators
} = require('../middlewares/validators.middleware');

gamesRouter.get('/', getAllGames);

// Protecting endpoints
gamesRouter.use(protectSession);

gamesRouter.post('/', createGameValidators, createGame)
gamesRouter.patch('/:id', gameExists, changeTitle);
gamesRouter.delete('/:id', gameExists, disabledGame);
gamesRouter.post('/reviews/:gameId', createReview)

module.exports = { gamesRouter };
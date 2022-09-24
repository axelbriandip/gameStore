const express = require('express');

// router
const usersRouter = express.Router();

// Controllers
const {
	createUser,
	disabledUser,
	getUsersActives,
	login,
	updateProfile
} = require('../controllers/users.controller');

// Middlewares 
const { userExists } = require('../middlewares/users.middleware');

const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middleware');

const {
	createUserValidators,
} = require('../middlewares/validators.middleware');

usersRouter.post('/signup', createUserValidators, createUser)
usersRouter.post('/login', login)

// Protecting endpoints
usersRouter.use(protectSession);

usersRouter.patch('/:id', userExists, protectUsersAccount, updateProfile);
usersRouter.delete('/:id', userExists, protectUsersAccount, disabledUser);
usersRouter.get('/', getUsersActives);

module.exports = { usersRouter };
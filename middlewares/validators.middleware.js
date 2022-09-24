const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join(' / ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Name must be at least 2 characters'),
	body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	checkValidations
];

const createGameValidators = [
	body('title')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Name must be at least 2 characters'),
	body('genre')
		.isString()
		.withMessage('Genre must be a string')
		.notEmpty()
		.withMessage('Genre cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Genre must be at least 2 characters'),
	checkValidations
];

module.exports = {
	checkValidations,
	createUserValidators,
	createGameValidators
};
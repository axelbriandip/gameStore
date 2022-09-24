// encrypt and token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { User } = require('../models/users.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// done
const createUser = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	// Encrypt password
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword
	});

	// Remove password from response
	newUser.password = undefined;

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

	// Validate if user exist with given email
	const user = await User.findOne({
		where: {
            email,
            status: 'active'
        },
	});

	// Compare passwords
	// If user doesn't exists or passwords doesn't match..
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Wrong credentials', 400));
	}

	// Remove password from response
	user.password = undefined;

	// Generate jwt
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});
});

const updateProfile = catchAsync(async (req, res, next) => {
    // block code
});

const disabledUser = catchAsync(async (req, res, next) => {
    // block code
});

const getUsersActives = catchAsync(async (req, res, next) => {
    // block code
});

module.exports = {
    createUser,
    login,
    updateProfile,
    disabledUser,
    getUsersActives
};
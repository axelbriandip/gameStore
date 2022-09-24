// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { Console } = require('../models/consoles.model');
const { Game } = require('../models/games.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');

const createConsole = catchAsync(async (req, res, next) => {
    const { name, company } = req.body;

	const newConsole = await Console.create({
        name, company
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newConsole },
	});
});

const getAllConsoles = catchAsync(async (req, res, next) => {
    const consoles = await Console.findAll({
		where: { status: 'active' },
        include: { model: Game }
	});

	res.status(200).json({
		status: 'success',
		data: { consoles },
	});
});

const changeTitle = catchAsync(async (req, res, next) => {
    const { name } = req.body;
	const { console } = req;

	await console.update({ name });

	res.status(200).json({
		status: 'success',
		data: { console },
	});
});

const disabledConsole = catchAsync(async (req, res, next) => {
    const { console } = req;

	// Soft delete
	await console.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
    createConsole,
    getAllConsoles,
    changeTitle,
    disabledConsole
};
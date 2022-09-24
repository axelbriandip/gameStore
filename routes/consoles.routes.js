const express = require('express');

// router
const consolesRouter = express.Router();

// Controllers
const {
    changeTitle,
    createConsole,
    disabledConsole,
    getAllConsoles
} = require('../controllers/consoles.controller');

// Middlewares 
const { consoleExists } = require('../middlewares/consoles.middleware');

const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middleware');

const {
    createConsoleValidators
} = require('../middlewares/validators.middleware');

consolesRouter.get('/', getAllConsoles);

// Protecting endpoints
consolesRouter.use(protectSession);

consolesRouter.post('/', createConsole);
consolesRouter.patch('/:id', consoleExists, protectUsersAccount, changeTitle);
consolesRouter.delete('/:id', consoleExists, protectUsersAccount, disabledConsole);

module.exports = { consolesRouter };
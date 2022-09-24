// import express
const express = require('express');

// import controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// init app express
const app = express();

// app can receive json
app.use(express.json());

// import routes
const { usersRouter } = require('./routes/users.routes');
// const {  } = require('./routes/restaurants.routes');
// const {  } = require('./routes/meals.routes');

// define endpoints
app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/games', restaurantsRouter);
// app.use('/api/v1/consoles', mealsRouter);

// global error handler
app.use(globalErrorHandler);

// if endpoint not exists
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
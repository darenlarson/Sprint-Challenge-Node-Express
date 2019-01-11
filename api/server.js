const express = require('express');

const configureMiddleware = require('../config/middleware.js');
const actionsRouter = require('../actions/actionsRouter.js');
const projectsRouter = require('../projects/projectsRouter.js');

const server = express();

// Middleware
configureMiddleware(server);

server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter);



module.exports = server;
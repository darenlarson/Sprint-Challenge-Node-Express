const express = require('express');

const actionsRouter = require('../actions/actionsRouter.js');
// const projectsRouter = require('../projects/projectsRouter.js');

const server = express();

server.use('/actions', actionsRouter);
// server.use('/projects', projectsRouter);



module.exports = server;
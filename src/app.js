const express = require('express');
const noteRoutes = require('./routes/note.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/notes', noteRoutes);

app.use(errorHandler);

module.exports = app;
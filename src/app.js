require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const vhsMoviesRouter = require('./controllers/vhsMovies');
const dvdMoviesRouter = require('./controllers/dvdMovies');
const projectorMoviesRouter = require('./controllers/projectorMovies');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.use('/vhs', vhsMoviesRouter);
app.use('/dvd', dvdMoviesRouter);
app.use('/projector', projectorMoviesRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

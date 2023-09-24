const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/places', placesRoutes); // => /api/places
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this page.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json(({ message: error.message || 'An unknown error occurred.' }));
});

// start Node + Express server on port 5000
mongoose.connect(
  'mongodb+srv://mohamedatef556:Mohamed96321Atef@cluster0.pponlh5.mongodb.net/sharehub?retryWrites=true&w=majority')
  .then(result => {
    console.log("Database is connected with PORT 5000");
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  })

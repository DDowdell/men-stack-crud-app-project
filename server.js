const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const gamesController = require('./controllers/games.js');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';




//Connections==================================================================
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Midware======================================================================
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passUserToView);
app.use('/auth', authController);
// app.use(isSignedIn);

app.use('/users/:userId/games', isSignedIn, gamesController);


//Routes below==================================================================

// GET /(home page)
app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});



//Routes above=====================================================================
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

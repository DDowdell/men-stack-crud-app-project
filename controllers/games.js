const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// routes==================================
router.get('/', (req, res) => {
  res.render('games/index.ejs');
});


router.get('/new', async (req, res) => {
  res.render('games/new.ejs');
});




module.exports = router;

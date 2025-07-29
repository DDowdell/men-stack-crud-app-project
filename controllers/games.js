const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// routes==================================
router.get('/', (req, res) => {
  res.render('games/index.ejs');
});




module.exports = router;

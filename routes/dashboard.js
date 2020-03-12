const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../db/auth.js');


//exporting dashboard 
router.get('/', ensureAuthenticated, (req, res, next) => {
      res.render('dashboard');
  });

  module.exports = router;

  
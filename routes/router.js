const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../passport/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('intro'));



module.exports = router;

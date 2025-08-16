const express = require('express');
const { body, validationResult } = require('express-validator');
const University = require('../models/University');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const {getUni} = require('../Controllers/uni');

// @route   GET /api/universities
// @desc    Get all universities
// @access  Public
router.get('/', getUni);



module.exports = router;
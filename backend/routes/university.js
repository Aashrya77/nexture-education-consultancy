const express = require('express');
const { body, validationResult } = require('express-validator');
const University = require('../models/University');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const {getUni, getUniByCountry} = require('../Controllers/uni');

// @route   GET /api/universities
// @desc    Get all universities
// @access  Public
router.get('/', getUni);
router.get('/:country', getUniByCountry);



module.exports = router;
const express = require('express');
const { createGroup } = require('../controllers/GroupController');
const router = express.Router();

router.route('/create').post(createGroup);
// router.route('/join').post();

module.exports = router;
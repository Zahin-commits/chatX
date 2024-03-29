const express = require('express');
const { register, login, getUserList } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/userList').get(protect,getUserList);

module.exports = router;
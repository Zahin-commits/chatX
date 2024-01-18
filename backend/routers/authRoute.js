const express = require('express');
const { register, login, getUserList } = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/userList').get(getUserList);

module.exports = router;
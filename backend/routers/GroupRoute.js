const express = require('express');
const { createGroup, joinGroup, groupList, addGroupMsg, getGroupAllMsg } = require('../controllers/GroupController');
const router = express.Router();

router.route('/').get(groupList)
router.route('/create').post(createGroup);
router.route('/join').post(joinGroup);
router.post('/addmsg',addGroupMsg);
router.post('/msg',getGroupAllMsg);

module.exports = router;
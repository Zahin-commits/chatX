const { createMessage, getAllMessage } = require('../controllers/messageController');

const router = require('express').Router();

router.post('/add',createMessage);
router.post('/get',getAllMessage);

module.exports = router;
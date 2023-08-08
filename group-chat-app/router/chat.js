const express=require('express');
const router=express.Router();

const { authenticate } = require('../middleware/auth')
const { showAllGroups } = require('../controller/chat')

router.get('/show-all-groups', authenticate , showAllGroups);

module.exports = router;
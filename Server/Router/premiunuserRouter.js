const express=require('express');
const router=express.Router();

const { authenticate } = require('../middleware/auth')
const { userleaderboard } = require('../Controller/premiumuserController')

router.get('/leaderboard',authenticate, userleaderboard)

module.exports = router;
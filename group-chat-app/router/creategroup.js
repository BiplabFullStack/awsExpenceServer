const express=require('express');
const router=express.Router();

const { authenticate } = require('../middleware/auth')
const { creategroup } = require('../controller/creategroup')

router.post('/create-group', authenticate , creategroup);

module.exports = router;
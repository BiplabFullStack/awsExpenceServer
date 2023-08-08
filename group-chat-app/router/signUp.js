const express=require('express');
const router=express.Router();
const{ signUpPostData } = require('../controller/signUp')


router.post('/signup', signUpPostData);

module.exports = router;
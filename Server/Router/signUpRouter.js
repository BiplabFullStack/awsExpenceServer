const express=require('express');
const router=express.Router();

const {signUp} = require('../Controller/signUpController')

router.post('/postdata', signUp);


module.exports = router;

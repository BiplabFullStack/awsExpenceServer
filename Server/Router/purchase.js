const express=require('express');
const router= express.Router();
const { authenticate } = require('../middleware/auth')
const {purchasepremium , updatetransactionstatus} = require('../Controller/purchase')

router.get('/premiummembership',authenticate,purchasepremium)

router.post('/updatetransactionstatus',authenticate, updatetransactionstatus)

module.exports=router;
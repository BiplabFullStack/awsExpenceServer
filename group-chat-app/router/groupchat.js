const express=require('express');
const router=express.Router();

const { authenticate } = require('../middleware/auth')
const { postmessage , showAllChat , showAllUsers , addmember , makeAdmine , deleteUser} = require('../controller/groupchat')


router.post('/message', authenticate, postmessage);
router.get('/show-all-chat/:groupname',authenticate, showAllChat)
router.get('/get-all-username/:groupname',authenticate, showAllUsers)
router.post('/group/invite-friend', authenticate, addmember);
router.post('/make-admin',authenticate, makeAdmine);
router.delete('/delete-user/:id',authenticate, deleteUser);

module.exports = router;







const Group = require('../model/group')
const UserGroup = require('../model/usergroup')
const User = require('../model/signUp')
const Chat = require('../model/message')



// -----------------------------------------------  Post Message --------------------------------------------------

const postmessage = async (req, res) => {
    try {
        const { message , groupname } = req.body;
        console.log(message , groupname);
        const group = await Group.findOne({where:{groupname}})
        //console.log("Group id is ", group.id);
      
        const msgdetails = await Chat.create({
            message,
            username:req.user.firstName,
            userId: req.user.id,
            groupId: group.id
        })
        console.log("message store successfully into db");
        res.status(201).json(msgdetails);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err: "Something went wrong" })
    }
}




// -----------------------------------------------  Show all Message  --------------------------------------------------

const showAllChat = async (req, res) => {
    try{
    const groupname = req.params.groupname;
    const group = await Group.findOne({where:{groupname}})
    const chat = await Chat.findAll({where:{groupId:group.id}})
    const usergroup = await UserGroup.findAll({where:{groupId:group.id , userId:req.user.id}})

    res.status(200).json({chat, usergroup})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ success: false, err: "Something went wrong" })
    }
}



// -----------------------------------------------  Show all Users  --------------------------------------------------

const showAllUsers = async ( req, res ) => {
    try{
        const groupname = req.params.groupname;
        const response = await UserGroup.findAll({where:{groupname}})
        if(response){
            return res.status(200).json(response);
        }else{
            throw new Error("Username not valid")
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({ success: false, err: "Something went wrong" })
    }
}



// -----------------------------------------------  Invite into another user  --------------------------------------------------

const addmember = async (req, res ) => {
    try{
    const {email, groupname} = req.body;
    const member = await User.findOne({where:{email}})
    if(!member){
        console.log('Email-Id not found');
        return res.status(400).json({success:false, msg: "Email-Id not found"})
    }
    const usergroup1 = await UserGroup.findOne({where:{userId:member.id, groupname:groupname}})
    if(usergroup1){
        console.log("User allready have on this group");
        return res.status(400).json({Success:false, msg:"User allready have on this group"})
    }
    const group = await Group.findOne({where:{groupname}})
    const usergroup = await UserGroup.create({groupname, name:member.firstName , groupId:group.id, userId:member.id})
    res.status(201).json(usergroup);
    console.log("member joined in this group");
    }
    catch(err){
        console.log(err.message);
        return res.status(400).json(err)
    }
}



// -----------------------------------------------  Make admin   --------------------------------------------------

const makeAdmine =async (req, res ) => {
    try{
        const loginUserId = req.user.id
    const {email , groupname} = req.body;
    const userdetails = await User.findOne({where:{email}})
    if(!userdetails){
        console.log("User not valid");
        return res.status(404).json({success: false, msg :"User not valid"})
    }
    const findadmin = await UserGroup.findOne({where:{userId:userdetails.id, groupname}})
    if(findadmin.isAdmine == true){
        console.log("User already admin");
        return res.status(403).json({success: false, msg :"User already admin"})
    }
    const findUser = await UserGroup.findOne({where:{userId:loginUserId, isAdmine:true}})
    
    if(findUser){
        const updatedData = await UserGroup.update({isAdmine:true},{where:{userId:userdetails.id}})
        console.log("Successfully make admin");
    return res.status(200).json(updatedData);
    
    }else{
        console.log("you are not group admin");
        return res.status(400).json({success: false , msg: "you are not group admin"})
    }
    }
    catch(err){
        console.log("error gyse");
        return res.status(400).json({err})
    }

}

const deleteUser = async ( req, res ) => {
    try{
        const id = req.params.id;
        const loginUserId = req.user.id;
        const findUser = await UserGroup.findOne({where:{userId:loginUserId, isAdmine:true}})
        if(findUser){
            const deletedItem = await UserGroup.destroy({where:{id}})
            console.log("deleted successfully");
            return res.status(200).json({success: true , msg :"deleted successfully"})
            
        }else{
            console.log('You are not admin');
            return res.status(400).json({success:false, msg:'You are not admin'})
        }
        
    }
    catch(err){
        console.log(err.message);
    }
}




// -----------------------------------------------  Exports  --------------------------------------------------

module.exports = { postmessage , showAllChat , showAllUsers , addmember , makeAdmine , deleteUser }


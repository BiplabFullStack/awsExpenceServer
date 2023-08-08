
const UserGroup = require('../model/usergroup')

//Show all groups 
const showAllGroups = async (req, res) => {
    try{
        const groups = await UserGroup.findAll({where:{userId:req.user.id}})
        res.status(200).json({groups})
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.showAllGroups = showAllGroups;
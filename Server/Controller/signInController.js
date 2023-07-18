const User = require('../Model/signUpModel')
const bcrypt = require('bcrypt')
const chalk = require('chalk')
 const jwt=require('jsonwebtoken');

const { emailInValid, passwordInValid } = require('../Validation/validation')


const generateAccessToken = (id,name,ispremium) => {
    return jwt.sign({userId:id,name:name,ispremium},process.env.secret)
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(emailInValid(email) || passwordInValid(password)){
            console.log(chalk.red('Please fill all the input correctlly'));
            return res
                .status(400)
                .json({ status: false, err: "Bad parameter Something is missing" })
        }

        const validUser = await User.findAll({where:{email}})
        if(validUser.length > 0){
            bcrypt.compare(password, validUser[0].password, (err, result)=> {
                if(err){
                    res.status(500)
                    .json({ status: false, msg: 'Something went wrong' })
                }
                if(result){
                    res.status(200)
                    .json({status:true, msg:'User Login Successfully',token:generateAccessToken(validUser[0].id,validUser[0].name)})
                    
                    console.log(chalk.magenta("Login Successfully"));
                }else{
                    res.status(400)
                    .json({status:false, msg:'wrong Password'})
                    console.log(chalk.red("wrong Password"));
                }
            })
        }else{
            console.log(chalk.red('User not exist'));
            return res
            .status(404)
            .json({status: false, msg: 'User not exist'})
        }
    }
    catch(err){
        res.status(500)
        .json({status: false, msg:'Server Error'})
    }
    
}


const premium = async (req, res, next) => {
    try{
        const userId = req.user.id;

        const validPrimiumUser = await User.findOne({
            where:{
                id:userId
            }
        })
        if(validPrimiumUser){
            return res
            .status(200)
            .send(validPrimiumUser)
        }
        
    }
    catch(err){
        console.log(err.message);
    }
    


}

module.exports = { loginUser , premium , generateAccessToken };
const User = require('../Model/signUpModel')
const bcrypt = require('bcrypt')
const chalk = require('chalk')
const { nameInValid, emailInValid, passwordInValid } = require('../Validation/validation')
const { result } = require('lodash')




const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (nameInValid(name) || emailInValid(email) || passwordInValid(password)) {
            console.log(chalk.red('Please fill all the input '));
            return res
                .status(400)
                .json({ status: false, err: "Bad parameter Something is missing" })
        } 


       //if user already register 
        const findEmail = await User.findOne({
            where: {
                email: email
            }
        })
        if (findEmail) {
            console.log("Email already register");
             res
                .status(409)
                .json({ status: false, err: "Email already exist" })
                console.log(res.statusCode);
               
        }



        else {
            bcrypt.hash(password, 10, async(err, hash)=>{
                console.log(hash);
                if(!err){
                    await User.create({name,email,password:hash})
                    res.status(201)
                    .json({msg:'Successfully Created New User'})
                    console.log(chalk.cyan(`Yours Details  Name: ${name} - Email: ${email} - Password : ${password} -> ${hash}`));
                }else{
                    throw new Error("Something went Wrong")
                }
            })
        }
    }
    catch (err) {
        res.status(500)
            .json(err)
    }


}



module.exports = {signUp};
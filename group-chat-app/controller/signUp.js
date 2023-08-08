const User = require('../model/signUp');
const bcrypt = require('bcrypt')
const { nameInValid, emailInValid, passwordInValid ,mobileInValid} = require('../validation/validation')

const signUpPostData = async (req, res) => {
    try {
        const { firstName, lastName, email, number, password } = req.body;
        if (nameInValid(firstName) || nameInValid(lastName) || emailInValid(email) || passwordInValid(password) || mobileInValid(number)) {
            console.log("Please fill all the input ");
            return res
                .status(400)
                .json({ success: false, err: "Bad parameter Something is missing" });
        
        } 
        //if user already register 
        const findEmail = await User.findOne({where:{email:email}})
        if (findEmail) {
            console.log("User already exists, Please Login");
             res
                .status(409)
                .json({ success: false, err: "User already exists, Please Login" })
                console.log(res.statusCode);   
        }
         else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (!err) {
                    await User.create({ firstName, lastName, email, number, password: hash })
                    console.log("Successfuly signed up ");
                    res.status(201).json({ success: true, msg: "Create Successfully " })
                } else {
                    console.log("Something went Wrong")
                }
            })
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ success: false, msg: "Something went wrong" })
    }
}

module.exports.signUpPostData = signUpPostData;
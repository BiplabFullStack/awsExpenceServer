const Sib = require('sib-api-v3-sdk');

const chalk = require('chalk')
const { emailInValid } = require('../Validation/validation')
const uuid = require('uuid')
const signUp = require('../Model/signUpModel')
const forgotPassword = require('../Model/forgetPasswordRequestModel')
const { where } = require('sequelize');
const bcrypt = require('bcrypt')


//---------------------------------------------  Send mail to register Email -------------------------------------------------------

const client = Sib.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const forgotPasswordEmail = async (req, res, next) => {
    const forgotUserEmail = req.body.email;
    if (emailInValid(forgotUserEmail)) {
        console.log(chalk.red('Please enter currect email '));
        return res
            .status(400)
            .json({ status: false, err: "Please enter currect email" })
    }


    const user = await signUp.findOne({ where: { email: forgotUserEmail } })
    if (user) {
        const id = uuid.v4()
        await forgotPassword.create({ id, active: true, signUpId: user.id })

        //console.log(req.body.email)
        const client = Sib.ApiClient.instance;

        // Configure API key authorization: api-key
        var apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;
        const tranEmailApi = new Sib.TransactionalEmailsApi;

        const sender = {
            email: 'biplbbackend@gmail.com',
            name: 'Biplab pvt.ltd'
        }
        const receivers = [
            {
                email: forgotUserEmail
            }
        ]

        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'OTP VERIFICATION',
            textContent: "Please Click on the below link ",
            htmlContent: `<html>
            <p>To reset your password please click on the below link</p>
            <a href ="http://localhost:3000/password/resetpassword/${id}">Reset Password</a>
            </html>`,
            textContent: "Next please go to the our website and login "
        }).then(result => {
            console.log(result);
            res.status(201).json({ success: true, message: 'we have send you OTP in your user email account' });
        }).catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })
    } else {
        console.log('No user found');
        return res.json({ success: false, message: 'User not found' })
    }
}



//---------------------------------------------  Reset Password -------------------------------------------------------

const resetpassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const resetpassword = await forgotPassword.findOne({ where: { id } })
        if (resetpassword) {
            resetpassword.update({ active: false })
           // res.sendFile(path.join('rootDir','views','resetform.html'))
            res.send(`<html>
            <form action="/password/updatepassword/${id}" method="get" >
            <h4>Reset Password</h4>
            <div>
                <label for="password">Password :</label>
                <input type="text" id="password" name="password" placeholder="Enter your password ">
            </div>
            <div>
                <label for="confirmpassword">Confirm Password :</label>
                <input type="text" name="confirmpassword ">
                    
            </div>
            <button>Save Password</button>
        </form>
        </html>
            `)
            res.end()


        } else {
            throw new Error("Something went wrong")
        }
    }
    catch (err) {
        return res
            .status(500)
            .send({ Success: false, err: "Server Error" })
    }
}



//---------------------------------------------  Update Password -------------------------------------------------------

const updatePassword = async (req, res, next) => {
    try {
        const  confirmpassword  = req.query.password;
        const { resetpasswordid } = req.params;
        // console.log(confirmpassword);
        // console.log(resetpasswordid);

        const forgetPasswordDetails = await forgotPassword.findOne({where:{id:resetpasswordid}})
      console.log(forgetPasswordDetails.UserId);
        if (forgetPasswordDetails) {
            bcrypt.hash(confirmpassword, 10, async (err, hash) => {
              // console.log(hash);
                if (!err) {
                    await signUp.update({ password: hash },{ where: { id: forgetPasswordDetails.signUpId } })
                    console.log("Your Password Update Successfully ");
                    res.status(201)
                    .send(`<html>
                    <div style="text-align: center;">
                        <h2 >Updated Successfully</h2>
                        <p >Please login again ....</p>
                        </div>
                      
                    </html>`)
                       
                } 
                else {
                    throw new Error("Something went Wrong")
                }
            })
        }else{
            throw new Error("Something went Wrong")
        }


    } catch (err) {
        return res.status(403).json({ err, success: false })
    }
}

module.exports = { forgotPasswordEmail, resetpassword, updatePassword }
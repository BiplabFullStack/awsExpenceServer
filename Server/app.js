
//-------------------------------------------------- Import Dependencies  -----------------------------------------------------------






require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./Database/database');
const cors=require('cors');
const chalk = require('chalk')
 const helmet = require('helmet')
// const compression = require('compression')
var path = require('path')
const fs = require('fs')
// const morgan = require('morgan')






//----------------------------------------------------- Import Router  ------------------------------------------------------------------

const websiteRouter = require('./Router/websiteRoute')
const signUpRouter=require('./Router/signUpRouter')
const loginRouter = require('./Router/signInRouter')
const purchase = require('./Router/purchase')
const premiumUser = require('./Router/premiunuserRouter')
const forgotpassword = require('./Router/forgetPasswordRoute')
const ForgotpasswordModel = require('./Model/forgetPasswordRequestModel')




//--------------------------------------------------- Schema(Model) -------------------------------------------------------------

const User = require('./Model/signUpModel')
const Expence = require('./Model/websiteModel')
const Order = require('./Model/purchase')



//--------------------------------------------------- Execute NPM package -------------------------------------------------------------

const app=express();




app.use(bodyParser.json());
app.use(cors());
// app.use(helmet())  //Bydefault set extra header for security purpose
// app.use(compression())   //Reduce the file size
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('combined', { stream: accessLogStream }))






//--------------------------------------------------- Execute Router -------------------------------------------------------------

app.use(signUpRouter)
app.use(loginRouter)
app.use(websiteRouter)
app.use('/purchase',purchase)
app.use('/premium',premiumUser)
app.use('/password',forgotpassword)



app.use((req, res)=>{
    console.log(req.url);
    res.sendFile (path.join(__dirname, 'public',`${req.url}`));
})







//-----------------------------------------------------  RelationShif ---------------------------------------------------------

User.hasMany(Expence)
Expence.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgotpasswordModel)
ForgotpasswordModel.belongsTo(User)



//---------------------------------------------------  Connectd to Sequelizer --------------------------------------------------

sequelize.sync().then(result=>{
    console.log(chalk.green.inverse('Database Connected ....'))
    app.listen(process.env.PORT,()=>{
        console.log(chalk.magenta.inverse( `Server running on port ${process.env.PORT} `));
    });
}).catch(err=>{
    console.log(chalk.red(err.message));
});



//-------------------------------------------------------  Page Not Found  ----------------------------------------------------

app.use('/*',(req, res)=>{
    res.status(404)
    .send('<h1  style ="text-align: center;">Page Not Found !!!</h1>')
})







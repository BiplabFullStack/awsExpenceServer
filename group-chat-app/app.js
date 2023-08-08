const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const chalk = require('chalk');
const path = require('path')
const fs = require('fs')
const compression = require('compression')
const morgan = require('morgan')
const sequelize = require('./database/db')




const signUpRoute = require('./router/signUp');
const loginRouter = require('./router/login');
const groupchatRouter = require('./router/groupchat');
const creategroup = require('./router/creategroup');
const chat = require('./router/chat')





const User = require('./model/signUp')
const Chat = require('./model/message')
const Group = require('./model/group')
const UserGroup = require('./model/usergroup')


const app = new express();
app.use(compression());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))








app.use(bodyParser.json());
app.use(cors());
app.use(signUpRoute);
app.use(loginRouter);
app.use(groupchatRouter);
app.use(creategroup)
app.use(chat)



User.hasMany(Chat)
Chat.belongsTo(User)

Group.belongsToMany(User , {through : UserGroup});
User.belongsToMany(Group , {through : UserGroup});

Group.hasMany(Chat);
Chat.belongsTo(Group);

sequelize.sync().then(result=>{
    console.log(chalk.green.inverse('Database Connected ....'))
    app.listen(process.env.PORT,()=>{
        console.log(chalk.magenta.inverse( `Server running on port ${process.env.PORT} `));
    });
}).catch(err=>{
    console.log(chalk.red(err.message));
});

app.use((req, res)=>{
     res.sendFile (path.join(__dirname, 'public',`${req.url}`));
 })

app.use('/*',(req, res)=>{
    res.status(404)
    .send('<h1  style ="text-align: center;">Page Not Found !!!</h1>')
})
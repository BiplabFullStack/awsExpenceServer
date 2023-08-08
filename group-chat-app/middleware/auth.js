const jwt = require('jsonwebtoken');
const User = require('../model/signUp');

const authenticate =  (req, res, next) => {
    try{
        const token = req.header('Authorization');
        //console.log(token);
        const user = jwt.verify(token, process.env.secret);
        // console.log('UserId --> ', user.userId);
        // console.log('name -->', user.firstName);

        User.findByPk(user.userId).then(user => {
            req.user = user;
            next();
        })
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.authenticate = authenticate;
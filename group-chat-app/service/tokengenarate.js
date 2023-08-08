const jwt=require('jsonwebtoken');
const generateAccessToken = (id,firstName,email) => {
    return jwt.sign({userId:id,firstName:firstName,email:email},process.env.secret)
}

module.exports.generateAccessToken = generateAccessToken;

const User = require('../model/signUp')

//------------------------------------------------  Name Validation ----------------------------------------------------------

const nameInValid = (name) => {
    if (!name || name.trim().length == 0) {
        return true
    } 
}




//------------------------------------------------  Email Validation ----------------------------------------------------------

const emailInValid = (email) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email || email.trim().length == 0 || !validRegex.test(email)) {
        return true;
    }
    
}

const emailAlreadyRegister =async (email) =>{
   const res = await User.findOne({where:{email:email}})
   if(res){
    console.log("Email already registered");
   }
}




//------------------------------------------------  Password Validation ----------------------------------------------------------

const passwordInValid = (password) => {
    if (!password || password.trim().length == 0) {
        return true
    }
    else {
        return false;
    }
}

const mobileInValid = (phoneNumber)=>{
    const reg = /^(0|91)?[6-9][0-9]{9}$/;
    if(!phoneNumber || phoneNumber.trim().length ==0 ){
        return true;
    }
    if(!reg.test(phoneNumber)){
        console.log("Invalid Mobile Number");
        return true;
    }
}

module.exports = { nameInValid, emailInValid, passwordInValid , emailAlreadyRegister , mobileInValid}
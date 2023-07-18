
const datatype = require('sequelize');
const sequelize = require('../Database/database')

const User = sequelize.define('signUp',{
    id: {
        type:datatype.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    name:{
        type:datatype.STRING,
        allowNull:false
    },
   email:{
    type:datatype.STRING,
    allowNull: false
   },
   password:{
    type:datatype.STRING,
    allowNull:false
   },
   ispremium:{
    type:datatype.BOOLEAN
   },
   totalexpence:{
    type:datatype.INTEGER,
    defaultValue:0
   }
})

module.exports = User;
const dataType = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('user',{
    id:{
        type:dataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    firstName:{
        type:dataType.STRING,
        allowNull:false
    },
    lastName:{
        type:dataType.STRING,
        allowNull: false
    },
    email:{
        type:dataType.STRING,
        allowNull:false
    },
    number:{
        type:dataType.STRING,
        allowNull:false
    },
    password:{
        type:dataType.STRING,
        allowNull:false
    }

});

module.exports = User;
const dataType = require('sequelize');
const sequelize = require('../database/db');

const chatapp = sequelize.define('message',{
    id:{
        type:dataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    message:{
        type:dataType.STRING,
        allowNull:false
    },
    username:{
        type:dataType.STRING,
        allowNull:false
    }
    

});

module.exports = chatapp;
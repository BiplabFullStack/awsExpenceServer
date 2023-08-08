const dataType= require('sequelize');

const sequelize=require('../database/db');

const usergroup= sequelize.define('usergroup',{
    id:{
        type:dataType.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },
    groupname:{
        type:dataType.STRING,
        allowNull:false
    },
    name:{
        type:dataType.STRING,
        allowNull:false
    },
    isAdmine:{
        type: dataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    

})

module.exports=usergroup;
const dataType=require('sequelize');

const sequelize=require('../database/db');

const group= sequelize.define( 'group' ,{
    id:{
        type:dataType.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },
    groupname:{
        type:dataType.STRING,
        allowNull:false,
        unique:true
    }
})

module.exports=group;
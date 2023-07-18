const dataType = require('sequelize');
const sequelize = require('../Database/database')

const User = sequelize.define('expence-tracker',{
    id: {
        type:dataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    itemName:{
        type:dataType.STRING,
        allowNull:false

    },
    expence:{
        type:dataType.INTEGER,
        allowNull:false
    },
    item:{
        type: dataType.STRING,
        allowNull:false
    },
    category:{
        type:dataType.STRING,
        allowNull:false
    }
})

module.exports = User;
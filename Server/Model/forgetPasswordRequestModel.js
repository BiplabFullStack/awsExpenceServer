
const datatype = require('sequelize');
const sequelize = require('../Database/database')

const forgotPasswordDb = sequelize.define('forgotPasswordDatabase',{
    id: {
        type:datatype.UUID,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    active:{
        type:datatype.BOOLEAN,
        allowNull:false
    },
  
   expiresby:{
    type:datatype.DATE,
   }
  
})

module.exports = forgotPasswordDb;
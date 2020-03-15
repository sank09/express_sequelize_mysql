const sequelize=require('./index');
const Sequelize = require("sequelize");

/* 
    @desc Create models migration with sync in server.js
*/
const models={

    employees:require('./EmployeeModel')

}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports=models;
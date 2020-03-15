const sequelize=require('./index');
const Sequelize = require("sequelize");

/* 
  @desc define scehema for employee
*/
const Employee = sequelize.define('employee', {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salary:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
  }, {
    // options
    timestamps: false
  });


  module.exports=Employee;
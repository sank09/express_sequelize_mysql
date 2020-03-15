const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

/* 
    @desc connection with the mysql 
*/
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

});


module.exports=sequelize;

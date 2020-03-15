const express = require('express')
const app = express();

/* 
    @desc import controllers
*/ 
const employeeController = require('../controllers/EmployeeController');

app.use('/employees',employeeController);

module.exports=app;

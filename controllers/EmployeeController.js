const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");
const Employees=require('../models/EmployeeModel');
const { validationResult } = require('express-validator');
const {employeeValidate,filterValidate} =require('../middlewares/validate');
const {response_proto,internal_server_err} =require('../helpers/response');
const Op = Sequelize.Op;



/* 
    @desc get employees by filter 
    @route {GET} api/employees
*/
router.get('/',async (req,res)=>{

    let data_to_find={};
    const response_data={...response_proto}

    //check querty params
    if(Object.keys(req.query).length ){

        const {salary=10000,filter='lt'}=req.query
        
        data_to_find={
            where:{
                salary:{
                    [Op[filter]]:salary 
                }
               
            }
        }

    }    
   

    try{

        //Get employees
        const employees_result= await Employees.findAll(data_to_find);
        const employee_success={...employee_created};

        response_data.message="";
        response_data.success=true;
        response_data.data=employees_result;

        res.status(200).json(employee_success)


    }
    catch(err){

        res.status(500).json(internal_server_err)


    }
    

  
 
});

/* 
    @desc add Data to DB
    @route {Post} api/employees
*/
router.post('/',employeeValidate(),async (req,res)=>{
        
        const errors=validationResult(req);
        const response_data={...response_proto}
        
        if(!errors.isEmpty()){

            response_data.message="Bad request data";
            response_data.success=false;
            response_data.error=errors.array();
            return res.status(400).json(response_data)
        }
      
        const {name,email,salary}=req.body;

        try{

             //Email already exists
            const dupli_employee= await Employees.findAll({
                where:{
                    email:email
                }
            });

       
            if(dupli_employee.length){
                
                response_data.message="Email already exists";
                response_data.success=false;
                response_data.error=[];
                return res.status(200).json(response_data)
            
            }

            // Create a new employee
            const created_employee = await Employees.create({ name: name, email: email,salary:salary })


            response_data.message="Employee created successfully";
            response_data.success=true;
            response_data.error=[];
            return res.status(200).json(response_data)

        }
        catch(err){
     
            res.status(500).json(internal_server_err)

        }
        

});

module.exports=router;

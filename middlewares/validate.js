const {body,query } = require('express-validator');

const employeeValidate=(req)=>{

    return [
        body('name','Name is required').not().isEmpty().trim(),
        body('email','Please include a valid email').isEmail().normalizeEmail(),
        body('salary','Salary is a required field').not().isEmpty().toFloat()
    ];
    

}

const filterValidate=(req)=>{
  
    return [
        query('salary','Salary cannot be empty').isLength({min:1}),
        query('filter','Filter connot be empty').isLength({min:2})
    ]
}

module.exports={
    employeeValidate,
    filterValidate
}


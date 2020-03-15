const express=require('express');
const app=express();
var cors = require('cors')
const routes = require('./routes/route.js');
const models = require("./models/allModels");

const PORT =  4500 

//Cors middleware
app.use(cors())


//middleware json
app.use(express.json({limit:'1mb'}));



// Checking connection status
models.sequelize.authenticate().then(function (err) {
    if (err) {
       console.log('There is connection in ERROR');
    } else {
       console.log('Connection has been established successfully');
    }
});

//Models creation of not present
models.sequelize.sync();




//Routes
app.use('/api',routes);



//Start and listen on port
app.listen(PORT, () => console.log(`Example app id listening on port ${PORT}!`));
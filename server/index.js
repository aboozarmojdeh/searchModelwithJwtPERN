const express=require('express');
const cors=require('cors');

const app=express();

// middlewares
app.use(express.json());
app.use(cors());

// ROUTES

// register and login routes
app.use('/auth', require("./routes/jwtAuth"));

// dashboard routes
app.use('/dashboard', require("./routes/dashboard"));

// models route
app.use('/models',require("./routes/models"))
// main page route
app.use('/',require("./routes/home"))







app.listen(5000,()=>{
    console.log('Server is listeing to PORT 5000')
});
// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "../db/dbconnect.js";
import configureSendGrid from "../db/sgmail.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("DB connection Failed");
    
})
configureSendGrid()


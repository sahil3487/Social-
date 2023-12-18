const express = require('express')
const bodyParser =  require('body-parser')

const app = express();

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: 'backend/config/config.env' })
}


//? Using MiddleWare

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//! Importing Routes 

const PostRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes")


//? Using Routes
app.use("/api/v1", PostRoutes)
app.use("/api/v1", userRoutes)




module.exports = app
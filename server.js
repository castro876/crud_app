const express = require('express')
const mongoose = require('mongoose')
const { use } = require('./routes/route')
const env = require('dotenv').config()
const UserRoute = require('./routes/route')
const PublicRoute = require('./routes/P_route')
const ejs = require('ejs')
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');


const app = express()

//middleware
app.use(express.urlencoded({ extended: true }))
//app.use(express.json())
app.use(express.static(__dirname + '/public/')) //this connects the path to the file
app.set('view engine', 'ejs')
app.use(cookieParser());

mongoose.connect(process.env._API_key).then( () => {
    app.listen(process.env.PORT | 8000,  () => console.log(`Listening on PORT  ${process.env.PORT}`))
    console.log('Connected to database successfully')

}).catch(err => console.log(err))


//routes
app.use(cors())
app.use(UserRoute)
app.use(PublicRoute)




































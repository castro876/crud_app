const express = require('express')
const route = express.Router()
const control = require('../controller/control')
const protected = require('../routes/auth_midware')

//Add user
route.post('/add_user', control.createUser)

//Display Add User page
route.get('/add_user', protected, control.createUserPage)

//Get a single user
route.get('/get_user/edit/:id', protected, control.displayUser)

//Get all users
route.get('/get_user', protected, control.displayAllUser)

//Edit a single user
route.post('/get_user/edit/:id', control.displayUserEdit)

//login auth User page
route.get('/login_user', control.loginUserPage)

//login User page
route.post('/login_user', control.loginUser)


module.exports = route


















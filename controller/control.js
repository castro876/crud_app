const { json } = require('express')
const { findById, findByIdAndUpdate } = require('../models/db_schema')
const Mod = require('../models/db_schema')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
//import modules



//Create schema for validation using joi
/*const validationSchema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().pattern(new RegExp('^[^\\s<>]+$')).min(8).max(30).required()
})*/



//Get request user page endpoint => /add_user
const createUserPage = (req, res) => {
    res.render('index')
    return
}
  //Post request add new user endpoint => /add_user
const createUser = async (req, res) => {
    try {
         const usrData = await Mod.create(req.body)
         module.exports.usrData
        res.redirect('/get_user')
        console.log('saved sucessfully')
       return
    } catch (error) {
        console.log(error)
    }
    
}

  //Get all users request endpoint => /get_user
const displayAllUser = async (req, res) => {
     if(req.query.uid) {
         const id = req.query.uid
         const usrData = await Mod.findByIdAndDelete(id) 
         console.log(`successfully deleted ${usrData}`)
     }

    const userData = await Mod.find({})
    //console.log('found sucessfully')
    res.render('user', {userData: userData}) //since the value has the same name we can remove it
    
}

  //Get edit user request endpoint => /get_user
const displayUser = async (req, res) => {
    try {
        const id = req.params.id
        const userData = await Mod.findById(id)
        res.render('single_user', {userData})
    } catch (error) {
        console.log(error)
    }
    
}

   //Post edit single user request endpoint => /get_user
const displayUserEdit = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

    //create hash password before it's edited
      const salt = await bcrypt.genSalt() 
      const hash = await bcrypt.hash(req.body.password, salt)

        const usrData = await Mod.findByIdAndUpdate(id, {
            name: req.body.name,
            email:req.body.email,
            password: hash
        })
        res.redirect('/get_user')
    } catch (error) {
        console.log(error)
    }
    
}

  
//Get request login page endpoint => /login_user
const loginUserPage = (req, res) => {
    res.render('login')
    return
}

//Post request login page endpoint => /login_user  Validating the user input
const loginUser = async (req, res) => {

      const usrEmail = req.body.email  
      const usrPassword = req.body.password
      let errorMessage = ''
      const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      const regexSymbol = /<|>|\s/g;


      if(!usrEmail) {
          errorMessage = "Email field cannot be empty" 
        res.render('login', {msg: errorMessage});
    
        } else if (!usrPassword /*|| usrPassword.length <= 8*/ ) {
            errorMessage = "Password field cannot be empty"
            res.render('login', {msg: errorMessage}); 
      
        } else if (!usrEmail.match(regex)) {
             
            errorMessage = "incorrect email or password" 
            res.render('login', {msg: errorMessage});
             
        }  else if ((usrPassword.match(regexSymbol))) {
             
            errorMessage = "incorrect email or password" 
            res.render('login', {msg: errorMessage});
              
   }  
         //checking if the user exist                  
            const usrExist = await Mod.findOne({email: req.body.email})
               if (!usrExist) {
                errorMessage = "incorrect email or password" 
                res.render('login', {msg: errorMessage});
         }
       //validate usr password before login   
        try {
              const validPass = await bcrypt.compare(req.body.password, usrExist.password)
               if(!validPass) {
                errorMessage = "Wrong user password" 
                res.render('login', {msg: errorMessage});
             } else {
                
                const secretKey = process.env.JWT_Secret
                
                const options = {
                    expiresIn: '1h' 
              }

              const payload = {
                id: usrExist._id
              }
                // Generate & send JWT token
                const token = jwt.sign(payload, secretKey, options)
                res.cookie('myCookie', token, { maxAge: 3600000, httpOnly: true });
                res.redirect('/get_user')
          }
       } catch (error) {
             console.log(error)
       }     
       


  }

        
   
       

       





  



module.exports = {createUser, createUserPage, displayAllUser, displayUser, displayUserEdit, loginUserPage, loginUser}
























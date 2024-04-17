//const { required } = require('@hapi/joi/lib/base')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
const {isEmail} = require('validator')

const Scheeema =  new mongoose.Schema({
    name : {
        type : String,
        required : true,
       // min: 6,
       // max: 20
    },

    email: {
        type : String,
        required : true,
      //unique : true,
       //validate: [isEmail]
    },

    password: {
        type: String,
        required : true

    }
})

//create mongoose hook to hash password before it's save
Scheeema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt() 
    this.password = await bcrypt.hash(this.password, salt)
    next()   
})


const Mod = mongoose.model('profile', Scheeema)
module.exports = Mod



































const { render } = require('ejs')
const express = require('express')
const route = express.Router()


route.get('/home_user', (req, res) => {
    res.render('home')
})

module.exports = route
















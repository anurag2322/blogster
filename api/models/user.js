const mongoose = require('mongoose')
// const {Schema, model} = 'mongoose'

const userschema= new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})

const usermodel= mongoose.model('user',userschema)
module.exports=usermodel
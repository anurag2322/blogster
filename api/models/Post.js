const mongoose = require('mongoose')

const postschema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{
    timestamps: true,
})

const postmodel = mongoose.model('post',postschema)
module.exports = postmodel
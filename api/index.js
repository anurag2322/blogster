const express = require('express')
const bcrypt=require('bcryptjs')
const cors = require('cors')
const Post = require('./models/Post')
const { default: mongoose } = require('mongoose')
const app=express()
app.use(cors({credentials:true,origin:'http://localhost:5173'}))
app.use(express.json())
const user= require('./models/user')
const jwt = require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const multer = require('multer')
const uploadmiddleware=multer({dest: 'uploads/'})
const fs = require('fs')

app.use(cookieParser())
app.use('/uploads',express.static(__dirname + '/uploads'))
const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';



mongoose.connect('mongodb+srv://anuragpande66:anurag2322@cluster0.nykh9tv.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',async (req,res)=>{
    const {username,password}=req.body
    try{
        const userdoc=await user.create({username,password:bcrypt.hashSync(password,salt)})
        res.json(userdoc)
    }
    catch(e){
        res.status(400).json(e)

    }
})
app.post('/login',async (req,res)=>{
    const {username,password}=req.body
    const userdoc = await user.findOne({username})
    const passOk = bcrypt.compareSync(password, userdoc.password);
    if(passOk){
        //loggedin
        jwt.sign({username,id:userdoc._id}, secret,{},(err,token)=>{
            if(err) throw err
            res.cookie('token',token).json({id:userdoc._id,username})
        })
    }else{
        res.status(400).json('wrong credentials')
    }
})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err
        res.json(info)
    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok')
})

app.post('/post',uploadmiddleware.single('file'),async (req,res)=>{
    const {originalname,path}=req.file
    const parts = originalname.split('.')
    const ext=parts[parts.length - 1]
    const newpath=path+'.'+ext
    fs.renameSync(path,newpath)


    const {token}=req.cookies
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err
        const {title,summary,content}=req.body
        const postdoc=await Post.create({
            title,
            summary,
            content,
            cover:newpath,
            author: info.id
        })
        res.json(postdoc)
    })

})

app.get('/post',async (req,res)=>{
    res.json(
        await Post.find()
        .populate('author',['username'])
        .sort({createdAt: -1})
        .limit(20)
        )
})

app.get('/post/:id',async (req,res)=>{
    const {id}=req.params
    const postdoc=await Post.findById(id).populate('author',['username']);
    res.json(postdoc)
})

app.listen(4000)


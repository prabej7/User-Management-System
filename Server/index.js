require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { timeStamp, error } = require('console');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Mongodb connected !');
}).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},timeStamp);

const User = mongoose.model('user',userSchema);

app.post('/register',async(req,res)=>{
    const { username,password } = req.body;
    const isUser = await User.find({username: username});
    if(isUser.length===0){
        bcrypt.genSalt(12,(error,salt)=>{
            bcrypt.hash(password,salt,async(error,hash)=>{
                const newUser = new User({
                    username: username,
                    password: hash
                });
                const savedUser = await newUser.save();
                res.status(200).json(savedUser);
            })
        })
    }else{
        res.status(201).json('User already exist.');
    }
});

app.post('/login',async(req,res)=>{
    try {
        const { username, password } = req.body;
        let user = await User.findOne({username: username});
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).json(user);
                } else {
                    res.status(201).json('Incorrect password !');
                }
            });
        } else {
            res.status(203).json('User not found!')
        }
    } catch (err) {
        console.log(err);
    }
})

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server is running at port ${PORT}`);
});
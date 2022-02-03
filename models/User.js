const mongoose = require('mongoose');
const questionSchema = require('./Question');
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'student' //0 for student 1 for teacher
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }]
});


module.exports = mongoose.model('User',UserSchema);
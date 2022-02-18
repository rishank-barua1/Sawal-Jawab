const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    teacher:{
        id:{
            type:mongoose.Schema.Types.ObjectId
        },
        name:String
    },
    education:String,
    interest:[String],
    
});

module.exports = mongoose.model('Teacher',TeacherSchema,'Teacher');
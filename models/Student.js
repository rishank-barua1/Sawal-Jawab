const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student:{
        id:{
            type:mongoose.Schema.Types.ObjectId
        },
        name:String
    },
    school:String,
    age:Number,
    
});

module.exports = mongoose.model('Student',StudentSchema,'Student');
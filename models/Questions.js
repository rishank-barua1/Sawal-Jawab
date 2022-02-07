const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
        },
        name:String
    },
    text:{
        type:String,
        required:true
    },
    isAnswered:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:Date.now
    },
    likes:{type:Number,default:0},

});

module.exports = mongoose.model('Questions',QuestionSchema,"Questions");
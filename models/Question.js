const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
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
    answer:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer'
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    created:{
        type:Date,
        default:Date.now
    },
    likes:Number,
    dislikes:Number

});

module.exports = mongoose.model('Question',QuestionSchema);
const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
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
    created:{
        type:Date,
        default:Date.now
    },
    likes:Number,
    dislikes:Number
});

module.exports = mongoose.model('Answer',AnswerSchema);
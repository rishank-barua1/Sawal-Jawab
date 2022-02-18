const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
        },
        name:String
    },
    question:{
        id:{
            type:mongoose.Schema.Types.ObjectId
        }
    },
    text:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    },
    likedby:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    dislikedby:[{
        type:mongoose.Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model('Answers',AnswerSchema,"Answers");
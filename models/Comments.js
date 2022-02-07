const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
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
    likes:{type:Number,default:0},
});

module.exports = mongoose.model('Comments',CommentSchema,"Comments");
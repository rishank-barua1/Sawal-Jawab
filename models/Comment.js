const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
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
    likes:Number,
    dislikes:Number

});

module.exports = mongoose.model('Comment',CommentSchema);
const Users = require('./../../models/Users');
const Questions = require('./../../models/Questions');
const Comments = require('./../../models/Comments');
const Answers = require('./../../models/Answers');
const mongoose = require('mongoose');
const req = require('express/lib/request');

const studentController = {
    addQuestion: async (req,res)=>{
        const question = req.body.question;
        const authorId = (req.user.id);
        const authorName = req.user.name;
    
        const newQuestion = new Questions({
            author:{
                id:authorId,
                name:authorName
            },
            text:question,
        });
        await newQuestion.save();
    
        req.flash('success_msg','Question submitted!');
        res.redirect('/student/dashboard');
    
    },

    deleteQuestion: async(req,res)=>{
        await Questions.deleteOne({"_id":(req.params.questionId)}).exec();
        await Answers.deleteMany({"question.id":(req.params.questionId)}).exec();
        await Comments.deleteMany({"question.id":req.params.questionId}).exec();
        req.flash('success_msg','Question deleted');
        res.redirect('/student/profile');
    },

    loadQuestionContent:async (req,res)=>{
        const questionId = req.params.questionId;
        let answers = [];
        answers = await Answers.find({"question.id":questionId}).sort({created:'desc'}).exec();
        let comments = [];
        comments = await Comments.find({"question.id":questionId}).sort({created:'desc'}).exec();
        let question = await Questions.findById({_id:questionId}).exec();
    
        res.render('./student/oneQuestion',{
            user:req.user,
            question:question,
            answers:answers,
            comments:comments
        });
    },

    filter: async (req,res)=>{
        const filter = req.params.bool;
        const id = req.user.id;
            let questions = [];
            questions = await Questions.find(
                {
                    $and:[
                        {"author.id":id},
                        {"isAnswered":filter}
                    ]
                }
            ).sort({created:'desc'}).exec();


        res.render('./student/studentProfile',{
            user:req.user,
            questions:questions
        })
    },

    addComment: async (req,res)=>{
        const questionId = req.params.questionId;
        const id = req.user.id;
        const comment = req.body.comment;
        const newComment = new Comments({
            author:{
                id:id,
                name:req.user.name
            },
            question:{
                id:questionId
            },
            text:comment
        });

        await newComment.save();

        res.redirect('/student/questions/'+questionId);
    },

    deleteComment: async (req,res)=>{
        const id = req.params.id;
        const questionId = req.params.questionId;
        await Comments.deleteOne({_id:id}).exec();
        res.redirect('/student/questions/'+questionId);
    }

    // likeHandler: async(req,res)=>{
    //     const type = req.params.type;
    //     const id = req.params.id;

    //     if(type)
    // }
    

}

module.exports = studentController;
const Users = require('./../../models/Users');
const Questions = require('./../../models/Questions');
const Comments = require('./../../models/Comments');
const Answers = require('./../../models/Answers');
const mongoose = require('mongoose');

const teacherController = {
    loadDashboard: async (req,res)=>{
        let questions = await Questions.find({
        }).sort({created:'desc'}).exec();


        res.render('./teacher/tdashboard',{
            user:req.user,
            questions:questions,
        })
    },

    loadQuestionPage: async (req,res)=>{
        const questionId = req.params.questionId;
        let answers = [];
        answers = await Answers.find({"question.id":questionId}).sort({created:'desc'}).exec();
        let comments = [];
        comments = await Comments.find({"question.id":questionId}).sort({created:'desc'}).exec();
        let question = await Questions.findById({_id:questionId}).exec();
    
        res.render('./teacher/oneQuestion',{
            user:req.user,
            question:question,
            answers:answers,
            comments:comments
        }); 
    },

    loadAnswerPage: async (req,res)=>{
        var question = await Questions.findById(req.params.questionId).exec();
        res.render('./teacher/answerQuestion',{
            question:question
        });

    },

    addAnswer: async (req,res)=>{
        const teacherId = req.user.id;
        const teacherName = req.user.name;
        const text = req.body.answer;
        const questionId = req.params.questionId;
        await Questions.findByIdAndUpdate(questionId,{isAnswered:true}).exec();
        let answer=await Answers.findOne({"author.id":teacherId},{"question.id":questionId}).exec();

        if(answer)
        {
            await Answers.findByIdAndUpdate(answer._id,{"text":text}).exec();
            req.flash('success_msg','Answer updated');
            res.redirect('/teacher/questions/'+questionId);
        }
        else{
            const answer1 = new Answers({
            author:{
                id:teacherId,
                name:teacherName
            },
            question:{
               id:questionId,
            },
            text:text
         });

        await answer1.save();

        req.flash('success_msg','Answer submitted');
        res.redirect('/teacher/questions/'+questionId);
    }
},

    addComment: async (req,res)=>{
        const questionid = req.params.id;
        const comment = req.body.comment;
        const userid = req.user.id;

        const newComment = new Comments({
            author:{
                id:userid,
                name:req.user.name
            },
            question:{
                id:questionid
            },
            text:comment
        });

        await newComment.save();

        res.redirect('/teacher/questions/'+questionid);
    },
    deleteComment: async (req,res)=>{
        const id = req.params.id;
        const questionId = req.params.questionId;
        await Comments.deleteOne({_id:id}).exec();
        res.redirect('/teacher/questions/'+questionId);
    }

}

module.exports = teacherController;
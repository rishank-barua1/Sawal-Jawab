const Users = require('./../../models/Users');
const Questions = require('./../../models/Questions');
const Comments = require('./../../models/Comments');
const Answers = require('./../../models/Answers');
const mongoose = require('mongoose');
const Teacher = require('./../../models/Teacher');
const Student = require('./../../models/Student');

const studentController = {
    loadProfile:async (req,res)=>{
        const authorId = req.user.id;
        let student = await Student.findOne({"student.id":authorId}).exec();
        let questions = [];
        questions = await Questions.find({"author.id":authorId}).sort({created:'desc'}).exec();
        res.render('./student/studentProfile',{
            user:req.user,
            questions:questions,
            student:student
        })
    },
    loadDashboard:async (req,res)=>{
        
        let questions = await Questions.find({}).exec();
        res.render('./student/sdashboard',{
            user:req.user,
            questions:questions
        });
    },
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
    },

    addRating: async (req,res)=>{
        const id = req.params.id;
        let question = await Questions.findById(id).exec();


        question.ratings.push(req.body.rating);
        await question.save();
        res.redirect('/student/questions/'+id);
    },

    loadEditPage:async(req,res)=>{
        let student = await Student.find({"student.id":req.user.id});
        res.render('./student/updateProfile',{
            user:req.user,
            student:student
        })
    },
    updateProfile:async (req,res)=>{
        const id = req.user._id;

        await Student.findByIdAndUpdate(id,{$set:{
            "student.id":id,
            "student.name":req.body.name,
            "age":req.body.age,
            "school":req.body.school
        }},{upsert:true}).exec();

        req.flash('success_msg',"Profile updated!");
        res.redirect('/student/profile');
    },

    viewProfile:async (req,res)=>{
        var questions=[];
        Answers.find({"author.id":req.params.id})
        .then(answers=>{
            answers.forEach(answer=>{
                questions.push(answer.question.id);
            })
            Questions.find({"_id":{$in : questions}})
            .then(result=>{
                Teacher.findOne({"teacher.id":req.params.id})
                .then(teacher=>{
                    res.render('./student/viewProfile',{
                        questions:result,
                        teacher:teacher
                    })
                })
                .catch(err=>console.log(err));
                
            })
            .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
    }

}

module.exports = studentController;
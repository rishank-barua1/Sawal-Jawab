const Users = require('./../../models/Users');
const Questions = require('./../../models/Questions');
const Comments = require('./../../models/Comments');
const Answers = require('./../../models/Answers');
const mongoose = require('mongoose');
const Teacher = require('./../../models/Teacher');
const Student = require('./../../models/Student');

const teacherController = {
    loadDashboard: async (req,res)=>{
        let questions = await Questions.find({
        }).sort({created:'desc'}).exec();


        res.render('./teacher/tdashboard',{
            user:req.user,
            questions:questions,
        })
    },

    loadProfile: (req,res)=>{
        //answers find out kre sbse pehle, phir uske baad unn answers mei questions ki id ki questions array 
        //mei store kri, phir Questions table mei se vo questions uthaye, jinki id iss array mei present thi
        var questions=[];
        Answers.find({"author.id":req.user.id})
        .then(answers=>{
            answers.forEach(answer=>{
                questions.push(answer.question.id);
            })
            Questions.find({"_id":{$in : questions}})
            .then(result=>{
                Teacher.findOne({"teacher.id":req.user.id})
                .then(teacher=>{
                    res.render('./teacher/teacherProfile',{
                        user:req.user,
                        questions:result,
                        teacher:teacher
                    })
                })
                .catch(err=>console.log(err));
                
            })
            .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
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
        let answer=await Answers.findOne({
            $and:
            [{"author.id":teacherId},{"question.id":questionId}]
        }
            ).exec();

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
    },

    deleteAnswer: async(req,res)=>{
        const id = req.params.id;
        const questionId = req.params.questionId;
        await Answers.deleteOne({"_id":id});
        var answer = await Answers.find({"_id":id},{"question.id":questionId});
        if(answer=='undefined')
        {
            await Questions.findByIdAndUpdate(questionId,{isAnswered:false});
        }
        req.flash('success_msg',"Answer deleted successfully");
        res.redirect('/teacher/questions/'+req.params.questionId);

    },

    loadEditPage:async (req,res)=>{
        let teacher = await Teacher.find({"teacher.id":req.user.id}).exec();
        res.render('./teacher/updateProfile',{
            user:req.user,
            teacher:teacher
        });
    },

    updateProfile:async(req,res)=>{
        let interests=[];
        interests.push(req.body.interest1);
        interests.push(req.body.interest2);
        if(typeof req.body.interest3 !=="")
            interests.push(req.body.interest3);
        if(typeof req.body.interest4 !=="")
            interests.push(req.body.interest4);
        if(typeof req.body.interest5 !=="")
            interests.push(req.body.interest5);
        
        const id = req.user._id;

        await Teacher.findByIdAndUpdate(id,{$set:{
                "teacher.id":id,
                "teacher.name":req.body.name,
                "education":req.body.education,
                "interest":interests
            }},{upsert:true}).exec();
    
            req.flash('success_msg',"Profile updated!");
            res.redirect('/teacher/profile');
        

    }

}

module.exports = teacherController;
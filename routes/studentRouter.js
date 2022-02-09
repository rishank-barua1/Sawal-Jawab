const router = require('express').Router();
const studentController = require('./../controllers/student/studentController');
const Questions = require('../models/Questions');
const Answers = require('../models/Answers');
const Comments = require('../models/Comments');
const {ensureStudentAuthenticated} = require('../passport/auth');

router.get('/dashboard', ensureStudentAuthenticated ,(req,res)=>{
    res.render('./student/sdashboard',{
        user:req.user
    });
});

router.get('/askQuestion',ensureStudentAuthenticated,(req,res)=>{
    res.render('./student/addQuestion',{
        user:req.user
    });
})

router.get('/profile',ensureStudentAuthenticated,async (req,res)=>{
    const authorId = req.user.id;
    let questions = [];
    questions = await Questions.find({"author.id":authorId}).sort({created:'desc'}).exec();
    res.render('./student/studentProfile',{
        user:req.user,
        questions:questions
    })
});

//load a question page with its answers and comments
router.get('/questions/:questionId',ensureStudentAuthenticated, studentController.loadQuestionContent);

//add question
router.post('/addQuestion',studentController.addQuestion);

//delete question
router.get('/questions/delete/:questionId',studentController.deleteQuestion);


//filter
router.get('/profile/filter/:bool',studentController.filter);

//add comment
router.post('/questions/comment/:questionId',studentController.addComment);

//delete comment
router.get('/comment/delete/:questionId/:id',studentController.deleteComment);

// router.get('/:answerId/:like',async (req,res)=>{
//     const type = req.params.like;
//     const filter = {id:req.params.answerId};
//     if(type=="likeInc")
//     {
//         const updateDoc = {
//             $inc:{
//                 'likes':1
//             },
//         }
//         const answer = await Answers.updateOne(filter,updateDoc);
//         res.send({likes:answer.likes});
//     }
//     else{
//         const updateDoc = {
//             $inc:{
//                 'likes':-1
//             },
//         }
//         const answer = await Answers.updateOne(filter,updateDoc);
//         res.send({likes:answer.likes});
//     }
// });

router.get('/questions/:questionId/:like',async (req,res)=>{
    const type = req.params.like;
    const filter = {id:req.params.questionId};
    if(type==="likeInc")
    {
        const updateDoc = {
            $inc:{
                'likes':1
            },
        }
        const question = await Questions.updateOne(filter,updateDoc);
        res.send({likes:question.likes});
    }
    else{
        const updateDoc = {
            $inc:{
                'likes':-1
            },
        }
        const question = await Questions.updateOne(filter,updateDoc);
        res.send({likes:question.likes});
    }
});

// router.get('/:commentId/:like',async (req,res)=>{
//     const type = req.params.like;
//     const filter = {id:req.params.commentId};
//     if(type=="likeInc")
//     {
//         const updateDoc = {
//             $inc:{
//                 'likes':1
//             },
//         }
//         const comment = await Comments.updateOne(filter,updateDoc);
//         res.send({likes:comment.likes});
//     }
//     else{
//         const updateDoc = {
//             $inc:{
//                 'likes':-1
//             },
//         }
//         const comment = await Comments.updateOne(filter,updateDoc);
//         res.send({likes:comment.likes});
//     }
// });



module.exports = router;
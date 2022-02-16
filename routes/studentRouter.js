const router = require('express').Router();
const studentController = require('./../controllers/student/studentController');
const Questions = require('../models/Questions');
const Answers = require('../models/Answers');
const Comments = require('../models/Comments');
const {ensureStudentAuthenticated} = require('../passport/auth');

router.get('/dashboard', ensureStudentAuthenticated ,studentController.loadDashboard);

router.get('/askQuestion',ensureStudentAuthenticated,(req,res)=>{
    res.render('./student/addQuestion',{
        user:req.user
    });
})

router.get('/profile',ensureStudentAuthenticated,studentController.loadProfile);

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

//add rating
router.post('/questions/rate/:id',studentController.addRating);

//update profile page
router.get('/profile/edit',studentController.loadEditPage);

//update profile
router.post('/profile/update',studentController.updateProfile);

//view profile
router.get('/view/:id',studentController.viewProfile);

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
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

//like answer
router.post('/answer/like/:id',studentController.likeHandler);

//dislike answer
router.post('/answer/dislike/:id',studentController.dislikeHandler);

//update profile page
router.get('/profile/edit',studentController.loadEditPage);

//update profile
router.post('/profile/update',studentController.updateProfile);

//view profile
router.get('/view/:id',studentController.viewProfile);

//question dislike
router.post('/question/dislike/:id',studentController.dislikeQuestionHandler);

//like question
router.post('/question/like/:id',studentController.likeQuestionHandler);





module.exports = router;
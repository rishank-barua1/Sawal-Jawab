const router = require('express').Router();

const teacherController = require('../controllers/teacher/teacherController');
const Questions = require('../models/Questions');
const {ensureTeacherAuthenticated} = require('../passport/auth');

//loading dashboard
router.get('/dashboard', ensureTeacherAuthenticated ,teacherController.loadDashboard);

//adding answer
router.get('/questions/answer/:questionId',ensureTeacherAuthenticated,teacherController.loadAnswerPage);

//saving answer in databse
router.post('/addAnswer/:questionId',ensureTeacherAuthenticated,teacherController.addAnswer);

//loading question page for teacher
router.get('/questions/:questionId',ensureTeacherAuthenticated,teacherController.loadQuestionPage);

//comment for teacher
router.post('/questions/comment/:id',teacherController.addComment);

//delete comment
router.get('/comment/delete/:questionId/:id',teacherController.deleteComment);

module.exports = router;
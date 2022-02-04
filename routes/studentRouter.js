const router = require('express').Router();

const addQuestionController = require('../controllers/student/addQuestionController');
const {ensureStudentAuthenticated} = require('../passport/auth');

router.get('/dashboard', ensureStudentAuthenticated ,(req,res)=>{
    res.render('sdashboard',{
        user:req.user
    });
});

router.get('/askQuestion',ensureStudentAuthenticated,(req,res)=>{
    res.render('addQuestion',{
        user:req.user
    });
})

router.post('/addQuestion',addQuestionController);
module.exports = router;
const router = require('express').Router();

const Questions = require('../models/Questions');
const {ensureTeacherAuthenticated} = require('../passport/auth');

router.get('/dashboard', ensureTeacherAuthenticated ,async (req,res)=>{
    let questions=[];
    questions = await Questions.find({}).limit(10).sort({likes:'desc'}).exec();
    res.render('./teacher/tdashboard',{
        user:req.user,
        questions:questions,
    });
});

module.exports = router;
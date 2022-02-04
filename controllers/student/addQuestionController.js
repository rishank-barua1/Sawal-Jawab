const Question = require('../../models/Question');

const addQuestionController = async (req,res)=>{
    const question = req.body.question;
    const authorId = req.user.id;
    const authorName = req.user.name;

    const newQuestion = new Question({
        author:{
            id:authorId,
            name:authorName
        },
        text:question,
    });

    await newQuestion.save();

    req.flash('success_msg','Question submitted!');
    res.redirect('/student/dashboard');

}

module.exports = addQuestionController;
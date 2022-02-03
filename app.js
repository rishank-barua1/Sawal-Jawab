const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const authRouter = require('./routes/authRouter');
const router = require('./routes/router');
const studentRouter = require('./routes/studentRouter');
const teacherRouter = require('./routes/teacherRouter');

const app =express();

require('./passport/passportConfig')(passport);

const URI = 'mongodb://localhost:27017/practice1';

mongoose.connect(
    URI,
    {useNewUrlParser:true,useUnifiedTopology:true}
)
.then(()=>console.log("Connected to database")).catch(err=>console.log(err));

app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

app.use(session({
     secret:'secret123',
     resave:true,
     saveUninitialized:true,
 }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



app.use('/',router);
app.use("/users",authRouter);
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on ${PORT}`));

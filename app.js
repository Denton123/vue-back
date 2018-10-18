var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/question');
var articleRouter = require('./routes/article');
var IdeaRouter = require('./routes/idea');
var MusicRouter = require('./routes/music');
var instrument = require('./routes/instrument');

// 中间件
const session = require('express-session')

// 配置
const config = require('./config/config')

// const sequelize = require('./models').sequelize
// const SequelizeStore = require('connect-session-sequelize')(session.store)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
	name: config.session.key,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: config.session.maxAge
	}
	// store: new SequelizeStore({   //将session存储到mysql
	// 	db: sequelize
	// })
}))

app.use('/auth', indexRouter);
app.use('/user', usersRouter);
app.use('/question', questionRouter);
app.use('/article', articleRouter);
app.use('/idea', IdeaRouter);
app.use('/music', MusicRouter);
app.use('/instrument', instrument);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

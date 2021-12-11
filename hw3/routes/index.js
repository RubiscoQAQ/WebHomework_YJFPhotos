var express = require('express');
//var router = express.Router();
var router = require('./SQL/sql')
var session = require('express-session')
/* GET home page. */
router.get('/session',function (req,res,next){
  var user = req.session.userMsg;
  console.log(user);
  res.send(user);
})
router.get('/sessionClear',function (req,res,next){
  req.session.userMsg = {};
  res.send('finish');
})
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/login.html', function(req, res, next) {
  res.render('login');
});
router.get('/index.html', function(req, res, next) {
  res.render('index');
});
router.get('/subpage.html', function(req, res, next) {
  res.render('subpage');
});
router.get('/error.html', function(req, res, next) {
  res.render('error');
});
router.get('/register.html', function(req, res, next) {
  res.render('register');
});
router.get('/MyInfo.html', function(req, res, next) {
  res.render('MyInfo');
});
router.get('/UserAgreement.html', function(req, res, next) {
  res.render('UserAgreement.html');
});

module.exports = router;

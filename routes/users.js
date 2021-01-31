var express = require('express');
var router = express.Router();
var db = require('../db');
var helpers = require('../helpers');
var errors = [];
var crypt = require('../crypto/crypto')

router.get('/register', helpers.loginChecker, function (req, res, next) {

  res.render('register', {
    title: 'Register'
  });

});

router.post('/register', helpers.loginChecker, function (req, res, next) {

  if (!helpers.checkForm([req.body.email, req.body.psw, req.body.pswrepeat, req.body.fname])) {
    errors.push('Please fill in all fields!');
    next();
    return;
  }

  if (!helpers.validateEmail(req.body.email)) {
    errors.push('Please enter a valid email address!');
    next();
    return;
  }

  if (req.body.psw !== req.body.pswrepeat) {
    errors.push('Passwords are not equal!');
    next();
    return;
  }

  // var sqlQuery = `INSERT INTO users VALUES(NULL, ?, MD5(?), ?)`;
  var sqlQuery = `INSERT INTO users VALUES(NULL, ?, ?, ?)`;
  /* encrypt */
  req.body.fname = crypt.encryption(req.body.fname);
  console.log("mk sau encrpytion ", req.body.psw);
  var values = [req.body.email, req.body.psw, req.body.fname];

  db.query(sqlQuery, values, function (err, results, fields) {

    if (err) {
      errors.push(err.message);
      next();
      return;
    }

    if (results.affectedRows == 1) {
      res.redirect('/login');
      return;
    } else {
      errors.push(err.message);
      next();
    }

  });

});

router.post('/register', function (req, res, next) {

  res.statusCode = 401;

  res.render('register', {
    title: 'Register',
    messages: errors
  });

  errors = [];

});

router.get('/login', helpers.loginChecker, function (req, res, next) {

  res.render('login', {
    title: 'Login'
  });

});

router.post('/login', function (req, res, next) {

  // if (!helpers.checkForm([req.body.email, req.body.psw])) {
  //   errors.push('Please fill in all fields!');
  //   next();
  //   return;
  // }

  // if (!helpers.validateEmail(req.body.email)) {
  //   errors.push('Please enter a valid email address!');
  //   next();
  //   return;
  // }

  // var sqlQuery = `SELECT * FROM users WHERE user_email = ? AND user_pass = MD5(?)`;
  // var email = "ducdothe98@gmail.com";
  var sqlQuery = 'SELECT * FROM users WHERE user_email = "' + req.body.email + '"' +  ' AND user_pass = "' + req.body.psw + '"';
  // req.body.email = "ducdothe98@gmail.com' or 1=1;--";
  
  var values = [email, req.body.psw];
  console.log(email);
  console.log(req.body.email);
  console.log(sqlQuery);

  db.query(sqlQuery, function (err, results, fields) {
  // db.query(sqlQuery, values, function (err, results, fields) {fvz
    console.log("results ", results)
    if (err) {
      errors.push(err.message);
      next();
      return;
    }

    console.log("flag ", req.session.authorised, "legnth", results.length);

    if (results.length > 0) {
      req.session.authorised = true;
      
      console.log("fname , decr", req.session.fname, results[0].user_fname);
      /* this one for decrypt database */
      for(let i = 0 ; i< results.length; i++) {
        console.log("decr", results[i].user_fname);
        results[i].user_fname = crypt.decryption(results[i].user_fname);
        console.log("decr", results[i].user_fname);
      }
      console.log("fname , decr", req.session.fname, results[0].user_fname);
      req.session.fname = results[0].user_fname

      res.redirect('/');
      return;
    } else {
      errors.push('The username or password is incorrect.');
      next();
    }

  });

});

router.post('/login', function (req, res, next) {

  res.statusCode = 401;

  res.render('login', {
    title: 'Login',
    messages: errors
  });

  errors = [];

});

router.get('/exit', function (req, res, next) {

  req.session.destroy(function (err) {
    res.redirect('/');
  });

});

module.exports = router;
var express = require('express');
var router = express.Router();
var db = require('../db');
var crypt = require('../crypto/crypto')

router.get('/', function (req, res, next) {

  var sqlQuery = `SELECT * FROM users`;
console.log("testtt");
  db.query(sqlQuery, function (err, results, fields) {
    
    /* this one for decrypt database */
    for(let i=0; i< results.length; i++){
      results[i].user_fname = crypt.decryption(results[i].user_fname);
    }
    // console.log(req.headersâ);
    // console.log(req.body);
    // console.log(req.session.authorised);
    res.render('index', {
      title: 'Register - Login',
      authorised: req.session.authorised,
      fname: req.session.fname,
      users: results
    });

  });

});
router.post('/b', function (req, res, next) {

  console.log(req.headers);
    console.log(req.body);
    console.log(req.session.authorised);

});
module.exports = router;
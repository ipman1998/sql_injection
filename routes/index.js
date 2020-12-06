var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {

  var sqlQuery = `SELECT * FROM users`;

  db.query(sqlQuery, function (err, results, fields) {
    console.log(req.headersâ);
    console.log(req.body);
    console.log(req.session.authorised);
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
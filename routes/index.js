var express = require('express')
var router = express.Router()
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shortlinker' })
})

// Shortlink Database Path
shortlink_json = __dirname + '\\shortlinks.json'

//Export file as module
module.exports = router

//Read the Shortlink Storage JSON
var shortfile = fs.readFileSync(shortlink_json, 'utf-8')
shortfile = JSON.parse(shortfile)

router.get('/login', function(req,res){
  fs.readFile(__dirname + '/../public/test2.txt', function(err, data) {
    if (err) {
      console.log(err); // Using URL-based Query for verifying password
    } else {
      res.write(data);
      res.end()
    }
  })
})

// GET Shortlink Dashboard
router.get('/dashboard', function(req, res) {
  console.log(req.query.pass);
  fs.readFile(__dirname + '/newgg.txt', function(err, data) {
    if (err) {
      console.log(err); // Using URL-based Query for verifying password
    } else {
      if(req.query.pass === "neathotdamn"){
        res.write(data);
        res.end();
      } else{
        res.redirect('/login');
      }
      
    }
  })
})

//POST to Processing Route, which edits JSON file
router.post('/process', function(req, res) {
  //  console.log(req.body);
  parsedBody = req.body;

  fs.readFile(shortlink_json, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      data = data.toString()
      var jsonData = JSON.parse(data)
      short = parsedBody.link[0]
      redirect = parsedBody.link[1]
      console.log(short + ' redirects to: ' + redirect)
      jsonData[short] = redirect
      jsonDataWrite = JSON.stringify(jsonData);
      fs.writeFile(shortlink_json, jsonDataWrite, function(err) {
        console.log(err)
      })
      res.redirect('/dashboard?pass=neathotdamn')
    }
  })
})

//GET Output of JSON file with shortlink-redirect pairs
router.get('/short-list', function(req, res) {
  res.send(JSON.stringify(shortfile))
})

//GET for various shortlinks
router.get('/:nam', function(req, res) {
  res.redirect(shortfile[req.params['nam']])
})

/*
router.get('/temp', function(req,res){
  console.log(req.query);
})
*/
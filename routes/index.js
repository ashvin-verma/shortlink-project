var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shortlinker' });
});

shortlink_json = __dirname+'\\shortlinks.json';

module.exports = router;

//General sites
/*
router.get('/reddit', function(req, res){
  res.redirect('http://reddit.com');
});
*/
var shortfile = fs.readFileSync(shortlink_json, 'utf-8');
shortfile = JSON.parse(shortfile);
/*
fs.readFile(shortlink_json, function(err, data){
  if(err){
      console.log(err);
  }
  else{var stringo = data.toString();
    var oba = JSON.parse(stringo);  
    for(i in oba){
      router.get(i, function(req,res){
        console.log(oba[i]);
      })      
    };
  }
});
*/

router.get('/dashboard', function(req, res){
    fs.readFile(__dirname+"/newgg.txt", function(err,data){
    if(err){
      console.log(err);
    }
    else{
      res.write(data);
      res.end();
    }
  }) 
/*  res.redirect('/dashboard.html'); */
});

router.post('/process', function(req,res){
//  console.log(req.body);
  parsedBody = req.body;
  
  fs.readFile(shortlink_json, function(err,data){
    if(err){
      console.log(err); 
    }
    else{
      data = data.toString();
      var jsonData = JSON.parse(data);
      short = parsedBody.link[0];
      redirect = parsedBody.link[1];
      console.log(short + " redirects to: "+redirect);
      jsonData[short] = redirect;
      jsonDataWrite = JSON.stringify(jsonData);
      console.log(jsonDataWrite);
      fs.writeFile(shortlink_json,jsonDataWrite, function(err){
        console.log(err);
      });
      res.redirect('/dashboard');
      
    }
  })
})
router.get('/short-list', function(req, res){
  res.send(JSON.stringify(shortfile));
})
router.get('/:nam',function(req,res){
  res.redirect(shortfile[req.params['nam']])
})
/*
for(i in oba){
  router.get(i, function(req,res){
    console.log(i);
    res.redirect(oba[i]);
    console.log(oba[i]);
  })      
};
*/
//Aeross websites
/*
router.get('/aeross/website', function(req, res){
  res.redirect('http://aeross.org');
})
router.get('/aeross/spacey/ARResub', function(req, res){
  res.redirect("https://drive.google.com/file/d/1is6xNZRDuljVzQDAPA5CBpe7wEnNneDa/view?usp=sharing");
})
*/
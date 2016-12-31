var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8000);

var tweets = [];

app.get('/', function(req, res) {
    var title = "Nwitter",
        header = "Welcome to Nwitter";


    res.render('index', {
        locals: {
            'title': title,
            'header': header,
            'tweets': tweets,
            'stylesheets': ['/public/style.css']
        }
    })
})

app.post('/send', function(req, res) {
    if(req.body && req.body.tweet) {
        tweets.push(req.body.tweet);

        if(acceptsHtml(req.headers['accept'])) {
          res.redirect('/', 302)
        } else {
            res.send({status: "ok", message: "tweet received"});
        }
    }
    else {
        res.send({status: "bad", message: "no tweets :("});
    }
})

app.get('/tweets', function(req, res) {
    res.send(tweets);
})

function acceptsHtml(header) {
  var accepts = header.split(',')
  for(i=0;i<accepts.length;i+=0) {
    if (accepts[i] === 'text/html') { return true }
  }

  return false
}
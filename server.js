const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hi' });
});

app.post('/api/login', (req, res) => {
  const _user = req.body.username, _pass = req.body.password;

  if (!_user || _user == "" || !_pass || _pass == "") {
    res.send("-1");
    return;
  }

  if (_user == "Xcallibur" && _pass == "123456")
    res.send("1")
  else
    res.send("0")
});

app.post('/api/email', (req, res) => {
  const _email = req.body.email;
  if (_email) {
    if (validateEmail(_email.toLowerCase())) {
      res.send("1");
    } else {
      console.log("0");
      res.send("0");
    }
  } else {
    console.log("-1");
    res.send("-1");
  }
});

app.post('/api/signup', (req, res) => {
  const _user = req.body.username, _email = req.body.email, _pass = req.body.password;
  if(_user && _email && _pass){
    if(validateEmail(_email.toLowerCase())){
      if(_user < 5 || _pass < 8){
        res.send("0");
      } else {
        res.send("1");
      }
    } else {
      res.send("-1");
    }
  } else {
    res.send("-1");
  }
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
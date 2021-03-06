const express = require('express');
const app = express();

const mongoose = require('mongoose');

this.MURL = 'CHANGE_TO_URL'

mongoose.connect(require('./config.json').u).then(() => console.log('db connected!!!'));

const URLModel = require('./models/URL.js');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(require('path').join(__dirname, '/static/index.html'))
});

app.post('/makeu', async (req,res) => {
  let redirect = req.body['redirect'];
  let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

  if(!redirect) return res.send(`Malformed URL!`)

  const um = await new URLModel({
    redirectid: id,
    redirect: redirect
  }).save();

  res.send(`Here's your link!<br/>${this.MURL}u/${um.redirectid}`);
})

app.get('/u/:code', async (req, res) => {
  let id = req.params['code'];
  const found = await URLModel.findOne({ redirectid: id });
  console.log(found)
  if (!found) return res.send('no thing in db found :sadface:')
  res.redirect(`${found.redirect}`)
})

app.listen(9932, () => console.log('server onlien'))
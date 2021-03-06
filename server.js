const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb+srv://charles:Charles123@cluster0-ubdpg.mongodb.net/test?retryWrites=true', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('cards').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {cards: result})
  })
})

app.post('/cards', (req, res) => {
  db.collection('cards').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/cards', (req, res) => {
  db.collection('cards')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
    { thumbDown: req.body.thumbDown + 1 }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// app.delete('/cards', (req, res) => {
//   db.collection('cards').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Card deleted!')
//   })
// })

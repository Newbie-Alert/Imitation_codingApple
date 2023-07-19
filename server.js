const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

// login 관련 라이브러리
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
// login 관련 미들웨어
app.use(session({ secret: 'pw', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// ajax를 위한 미들웨어
app.use(express.json());
let cors = require('cors');
app.use(cors());




//정적 파일을 이용하여 통신하기 위한 미들웨어 
app.use(express.static(path.join(__dirname, "/codingabbble/build")));
app.use(express.urlencoded({ extended: true }));

let db;
MongoClient.connect(process.env.DB_URL, function (err, client) {
  if (err) {
    return console.log(err);
  }

  db = client.db('apple');

  app.listen(process.env.PORT, function () {
    console.log('listening on 8080');
  })


  // /login으로 POST 요청을 하면 미들웨어를 통한 유저 검증 후 콜백함수가 진행된다
  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/fail' // login 실패 시 /fail로 보내주기
  }), function (req, res) {
    db.collection('sign').updateOne({ id: req.body.id }, { $inc: { activate: 1 } }, function (err, result) {
      console.log(result)
    })
    res.redirect('http://localhost:3000/')  // 로그인 성공 시 '/' 로 보내주기
  });


  // 미들웨어에 들어가는 인증 머신 (Strategy는 인증방법을 말함)
  passport.use(new LocalStrategy({
    usernameField: 'id', // 프론트에서 POST 할때 오는 name속성이 id인 것
    passwordField: 'pw', // 프론트에서 POST 할때 오는 name속성이 pw인 것
    session: true, // 로그인 후 session에 저장을 할 것인가
    passReqToCallback: false, // id, pw 외에 다른 것도 검사를 할 것인가 (이름, 이메일 등)
  }, function (id, pw, done) { // 입력한 id/pw를 인자로 받음,
    //console.log(req_id, req_pw);
    // db의 user 데이터 중 요청 값과 일치하는 것을 찾아옴
    db.collection('user').findOne({ id: id }, function (err, result) {
      // done: 세 개의 인자 {에러, 모든 정보가 일치할 때 보내줄 데이터, 유저에게 보낼 메세지}

      // error처리
      if (err) return done(err)

      // 요청값과 일치하는 데이터가 없다면 
      if (!result) return done(null, false, { message: '존재하지않는 아이디요' })

      // 일치하는 id 데이터를 찾은 후 성공하면 pw도 일치하는지 검증
      // 원래 pw는 암호화해서 비교해야 됨
      if (pw == result.pw) {
        return done(null, result)
      }
      else {
        return done(null, false, { message: '비번틀렸어요' })
      }


    })
  }));

  // 로그인 성공 시 session 데이터 생성
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // 로그인 후 활동 시 발동
  passport.deserializeUser(function (id, done) {
    done(null, {})
  })



  app.get('/confirm', function (req, res) {
    console.log(req.body.id)
    db.collection('sign').findOne({ activate: 1 }, function (err, result) {
      res.send(result)
    })
  })

  app.post('/logout', function (req, res) {
    db.collection('sign').updateOne({ activate: 1 }, {
      $set: { activate: 0 }, function(err, result) {
        console.log(result);
      }
    })
    res.redirect('/');
  })

  app.get('/course', function (req, res) {
    db.collection('data').find().toArray(function (err, result) {
      res.json(result)
    })
  })

  //=============
  // DETAIL PAGE
  //=============
  app.get('/detail/:id', function (req, res) {
    db.collection('data').findOne({ id: parseInt(req.params.id) }, function (err, result) {
      res.json(result)
    })
  })

  app.get('/reviews/:id', function (req, res) {
    db.collection(`reviews`).findOne({ id: parseInt(req.params.id) }, function (err, result) {
      res.json(result);
    })
  })

  app.get('/count/:id', function (req, res) {
    db.collection(`reviewCount`).findOne({ id: parseInt(req.params.id) }, function (err, result) {
      res.json(result);
    })
  })

  app.post('/add', function (req, res) {
    db.collection('cart').insertOne({ id: req.body.id, lesson: req.body.name, price: req.body.price, quantity: parseInt(req.body.quantity) }, function (err, result) {
      console.log('추가 완료')
    })
  })


  //============
  // BOARD PAGE
  //============

  app.get('/board/:id1/:id2', function (req, res) {
    db.collection(`board`).findOne({ _id: parseInt(req.params.id2) }, function (err, result) {
      res.json(result);
    })
  })

  app.post('/board/post/:id', function (req, res) {
    db.collection('boardCount').findOne({ title: req.params.id }, function (err, result1) {
      db.collection('board').updateOne({ title: req.params.id }, { $push: { board: { id: result1.count + 1, title: req.body.write_form_title, content: req.body.write_form_content } } }, function (err, result3) {
        console.log(result3)
        res.redirect('http://localhost:3000/board/nextjs/0')
      })
    })
    db.collection('boardCount').updateOne({ title: req.params.id }, { $inc: { count: 1 } }, function (err, result) {
      console.log('게시물 업뎃 완료')
    })
  })

  app.get('/board/content/:id1/:id2', function (req, res) {
    db.collection('board').findOne({ title: req.params.id1 }, function (err, result) {
      res.json(result.board);
    })
  })

  //============
  // CART PAGE
  //============

  app.get('/cart', function (req, res) {
    db.collection('cart').find().toArray(function (err, result) {
      res.json(result);
    })
  })

  app.post('/delete', function (req, res) {
    console.log(req.body.id)
    db.collection('cart').deleteOne({ id: req.body.id }, function (err, result) {
      console.log('삭제~')
    })
  })




})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// react에 라우팅을 넘김
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, ''))
})



## 1일 차

### Nav Comp 제작

## 2일 차

### MainPage_section 제작

## 3일 차

### MainPage_2번 section 제작, MainPage 반응형 적용

## 4일 차

### MainPage 완료

# Server Tutorial 후

[백엔드 학습](https://github.com/Newbie-Alert/serverTutorial)

## 서버와 연동하여 로그인 기능 추가

- **passport** 라이브러리를 통하여 local 방식 인증을 사용
- useEffect를 통해 Nav 컴포지션이 마운트 될 시, DB의 유저 데이터 속 activate 값에 따라 UI 변경

## 6일 차

### Course Page 만드는 중

- DB에서 강의 목록 정보를 가져와 UI 생성
- mongo DB의 search index를 통해 UI목록을 최신순, 가나다순, 인기순으로 정렬하는 기능을 추가할 예정
  <br/>

### 필요한 부분

- mongo DB에 데이터를 등록해놓을 때 하나하나 손으로 넣기에는 시간이 오래 걸려서
  mongo DB 명령어에 대해 학습해야겠다.

## 7일 차

- course Page UI 수정

## 8일 차

- 서버에서 url parameter를 사용하여 각각의 detail페이지에 필요한 정보를 제공할 수 있도록 API를 제작하였다.  
   이제 detail페이지를 열 때 해당 detail page에 필요한 데이터를 가져올 수 있다.  
   예) detail/0 페이지를 열면 detail/0 에 해당하는 정보를 가져옴.

  ### 원리

  요청에 담겨오는 `url parameter`와 `같은 id 값을 가진 데이터`를 DB에서 찾아서 프론트로 전달해주는 것.  
   주의할 부분은 `url parameter`는 `String 타입`이라서 `형변환이 필요`하다는 것

  ```javascript
  server.js;

  app.get("/detail/:id", function (req, res) {
    db.collection("data").findOne(
      { id: parseInt(req.params.id) },
      function (err, result) {
        res.json(result);
      }
    );
  });
  ```

### 제작은 실패했다

#### 실패 사유

- 서버에서 데이터를 가져와 state에 적용하기까지는 성공했으나,  
  STATE가 자꾸 새로고침 할 때마다 초기화 되어 데이터가 없다고 한다.

## 9일 차

### Detail Page 제작 성공

### 해결방안

- 8일 차에는 프론트에서 get요청을 할 때 이전에 만들어 놓은 API에 요청을 했었는데 (요청 주소만 다르고 요청 처리 방식은 똑같은 것)  
  `url parameter`를 사용한 API로 데이터를 받아올 수 있게 수정하였더니 해결됐다.  
  서버에서 처리 하는 방식은 같은데  
  왜 url parameter를 사용하는 페이지에서는 새로고침 할 때마다 useEffect가 작동하지 않았었는지 아직 이유는 잘 모르겠다.....🤔🤔🤔🤔🤔🤔

## 10일 차

### 산 넘어 산 \_ DB의 데이터들

8일 차에서 조금 막혔다가 해결하고 넘어오니  
이번엔 DB에 할 일이 많아 속도가 더뎌졌다.  
Detail Page에 정보가 상당히 많이 들어간다.  
처음에는 간단히 생각하고 주먹구구 식으로 DB를 만들었는데  
강좌의 커리큘럼 테이블에 들어갈 정보들,  
리뷰단에 들어갈 리뷰 데이터들까지..  
리뷰는 리뷰를 강좌 카테고리별로 나눠야하고,
할 일이 많아서 머리가 복잡하다.  
프론트도 bootstrap을 사용하지 않고 만들고 있지만 언젠가 bootstrap을 써야할 수도 있을 거 같다.

### 문제와 해결

### Html parsing

DB에서 커다란 `String`형태의 `html`자료를 리액트에 바인딩 해보니  
아래와 같이 String 형태로 나오는 문제가 있었다.

```
<p>&nbsp;</p>
<p>Next.js는 프론트엔드부터 서버까지 만들 수 있는 React기반 프레임워크입니다.</p>
<p>이것만 사용해도 풀스택 웹개발이 가능합니다.&nbsp;</p>
<p>&nbsp;</p>
<p>Next.js 사용시 서버사이드 렌더링이 쉽기 때문에&nbsp;</p>
```

구글링을 해보니 `String형태의 html`을 `html로 렌더`해서 출력해주는 라이브러에 대해 알게 됐다.
`react-html-parser` 라는 라이브러리였는데
사용법과 효과는 아래와 같았다.

### react-html-parser 사용법

```javascript
<detail.jsx 코드>

import {HtmlParser} from "react-html-parser";

// main
function Detail(){
  return(
    ~~~~~
  )
}

// component
function TAB({ data }) {
  // string 형태의 html을 변수에 담고
  const htmlString = data.about;
  // htmlParser() 안에 앞서 만든 변수를 인자로 보낸다
  return <div className={styles.tab}>{HtmlParser(htmlString)}</div>;
}
```

### react-html-parser 적용 후 결과

```txt
Next.js는 프론트엔드부터 서버까지 만들 수 있는 React기반 프레임워크입니다.

이것만 사용해도 풀스택 웹개발이 가능합니다.



Next.js 사용시 서버사이드 렌더링이 쉽기 때문에
```

## 11일 차

### 강좌 DB 구축

- 강좌 테이블 UI를 반복문으로 축약하여 제작할 때 편리하도록 제작하였다.

```JSON
"chapter":[
  {"title":"Next.js 많이 쓰는 이유를 알아보자","duration":"06:00"},
  {"title":"Next.js 설치와 개발환경 셋팅","duration":"06:00"},
  .....
  ]
```

### 이제 리뷰 섹션이 남았다...!

### 계획

- DB에 리뷰처럼 보일 데이터를 구축
- 실제 리뷰를 작성할 때 리뷰의 개수와 평점, 고유 ID를 부여할 collection 생성
- 리뷰 데이터를 가져와 detail page UI에 렌더

## 12일 차

### 추가된 부분

- 리뷰 섹션 추가
- DB에 리뷰, 리뷰 관리 데이터 구축
- detail page 반응형으로 수정

### DB 구축

- DB는 review, reviewCount 컬렉션을 생성하여  
  각각 리뷰와 리뷰 갯수, 점수등을 기록하도록 구축하였다.
- `url parameter`를 사용하여 해당 과목의 디테일 페이지에서 해당 과목의 데이터를 찾아서 가져오기 유용하도록 데이터에 고유 id를 부여

```javascript

<Detail.jsx 의 useEffect의 get요청>
// axios all을 사용하여 여러 개의 데이터를 가져오도록 하였다.

axios.all([
  axios.get(`http://localhost:8080/reviews/${id.id}`),
  axios.get(`http://localhost:8080/count/${id.id}`),
])
.then(
  axios.spread((res1, res2) => {
    setReviews(res1.data.review);
    setReviewCount(res2.data.count);
  })
);



<server.js>

app.get("/reviews/:id", function (req, res) {
  db.collection(`reviews`).findOne(
    { id: parseInt(req.params.id) },
    function (err, result) {
      res.json(result);
    }
  );
});

app.get("/count/:id", function (req, res) {
  db.collection(`reviewCount`).findOne(
    { id: parseInt(req.params.id) },
    function (err, result) {
      res.json(result);
    }
  );
});
```

### 남은 것

- 이제 게시판, 강의 재생 페이지, 카트/구매 기능이 남았다...!

## 12일 차

### 강좌 평균점수에 따라 별점이 표기되도록 하였다

- CSS 의 `mix-blend-mode`를 통해 배경의 `width`에 따라 별의 색상이 변경되게 한 후  
   배경의 `width 값`에 평균 값을 주게 되면 이렇게 된다!!

  ## 1시간 정도 헤맨 거 같다 😗

  ```CSS
  <CSS>

  .star_box {
  width: fit-content;
  height: 20px;
  background-image: url("https://dummyimage.com/1000/fcd62d.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
  }

  .star_box div {
  mix-blend-mode: screen;
  color: black;
  background-color: white;
  width: 100%;
  height: 100%;
  }
  ```

  ```javascript
  <Detail.jsx>

  function STAR({ ReapeatStar, average }) {
  return (
    <div
      className={styles.star_box}
      style={{ backgroundSize: `${average}% 20px` }}
    >
      <div>
        {ReapeatStar.map((i) => {
          return (
            <FontAwesomeIcon key={i} icon={faStar} className={styles.star} />
          );
        })}
      </div>
    </div>
  );
  }
  ```

### 따란-

평균이 50일 때의 별점이 표기되는 모습

![img](./mdImg/star.png)

## 문제였던 것

- 분명 배경은 너비가 50% 인데 자꾸 별점은 54% 정도로 나오는 것.

## 해결

- 별점 `div` 자체의 width를 `fit-content`로 하여  
  div 안의 요소인 `별 5개 만큼의 너비`를 주어 너비를 같게 하였다.

## 13일 차

### 추가 된 기능

- 게시판 글 게시 기능 추가
- 게시판 글 Page 완성

## 문제였던 것

- API를 만드는데 머리가 조금 복잡했다.

## 해결방안

- API에 `url parameter`를 두 개 전달하여  
  /게시판/`'강좌 이름(param 1)'` / `게시글 고유의 id(param 2)` 이런 식으로 작동하게 하여 게시판 각각의 게시글 상세페이지를 완성했다.

```javascript
//============
// BOARD PAGE
//============

// 게시판이 마운트 될 때 실행되는 코드
// 게시판 리스트 UI에 바인딩 되는 data를 가져옴
// /board/Nextjs/0 이런 식
app.get("/board/:id1/:id2", function (req, res) {
  // 강좌 마다 고유의 코드가 있는데 페이지와 일치하는 정보를 가져오기 위해 사용했다.
  db.collection(`board`).findOne(
    { _id: parseInt(req.params.id2) },
    function (err, result) {
      res.json(result);
    }
  );
});

// 게시판에 글쓰기 기능
// 해당 강좌 DB collection의 obj 속
// board 배열 안에 post요청한 데이터를 push
app.post("/board/post/:id", function (req, res) {
  db.collection("boardCount").findOne(
    { title: req.params.id },
    function (err, result1) {
      db.collection("board").updateOne(
        { title: req.params.id },
        {
          $push: {
            board: {
              id: result1.count + 1,
              title: req.body.write_form_title,
              content: req.body.write_form_content,
            },
          },
        },
        function (err, result3) {
          console.log(result3);
          res.redirect("http://localhost:3000/board/nextjs/0");
        }
      );
    }
  );
  // 해당 강좌의 총 게시물 개수 1 증가
  db.collection("boardCount").updateOne(
    { title: req.params.id },
    { $inc: { count: 1 } },
    function (err, result) {
      console.log("게시물 업뎃 완료");
    }
  );
});

// 게시판 글 각각의 상세페이지
app.get("/board/content/:id1/:id2", function (req, res) {
  db.collection("board").findOne(
    { title: req.params.id1 },
    function (err, result) {
      res.json(result.board);
    }
  );
});
```

## 배운 것

- 조금 더 심도있는 통신 구조를 만들어봐서 조금 경험치가 늘었다ㅎ
- updateOne()의 `$push` operator에 대해 알게 되서 좋았다.
- .env 파일을 통해 배포 후 서버와 통신이 안 되는 것을 방지하는 것에 대해 학습했다.

## 14일 차

- 장바구니 기능 추가

### 문제와 해결

- `useEffect()`로 데이터를 받아온 후 새로고침 시 오류가 떴는데  
  코드가 실행되는 순서가 레이아웃이 먼저 렌더 된 후 useEffect가 실행되서 그렇다고 한다.  
  그래서 받아온 데이터가 비어있지 않을 때 렌더를 하도록 삼항연산자를 추가하였다.
- 장바구니가 비어있지 않다면 Nav의 장바구니 아이콘 옆에 장바구니 속 제품이 몇 개인지 표기하도록 했는데, Nav를 새로고침 하지 않으면 뜨지 않는다.  
  이것을 해결하기 위해 실시간으로 서버와 통신하도록 `soket.io`를 학습할 예정이다.

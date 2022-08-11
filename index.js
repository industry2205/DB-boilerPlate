// 랜더 시작점
const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    config.mongoURI
    // {
    //   useNewUrlParser: true,
    //   useUnitfiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// mongodb + srv://admin:<password>@boilerplate.mmoar.mongodb.net/?retryWrites=true&w=majority
console.log(process.env.MONGO_URI);

app.get("/", (req, res) => res.send("hello world! 안녕하세요 ~ ")); // req : request, res : response

app.post("/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 Client에서 가져오면, 데이터 베이스에 넣어줌
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에 있는지 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        message: " 제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호 체크
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSucess: false,
          message: "비밀번호가 틀렸습니다.",
        });
    });
    // 3. 비밀번호가 맞다면 토큰을 생성하기
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        message:"X",
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!is)
    })
  })
})


app.listen(port, () => console.log(`example ${port}`));

// body-parser - 서버로 request하는 통신에 사용됨 (Client에서 보내는 정보를 서버에서 가져올 수 있도록 만들어줌)
// postman - Client 역할을 해줌











// call back 함수 이해하기(feat.동기비동기) ********************************

// const callback = (number) => {
//   console.log(number);
// };

// const add = (a, b, callback) => {
//   // 동기 / 비동기
//   // 1
//   // 동기 -> 바로실행
//   const result = a / b;

//   // 비동기 -> 언제 결과가 나올지 모르는거
//   const user = db.read(); // 비동기
//   callback(err, user);

//   return result;
// };

// const result = add(1, 2);

// const asyncAdd = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 1000);
//   });

// const asyncResult = async () => {
//   const result = await asyncAdd() // 기다림
//   console.log(result) // -> true

//   return result;
// }
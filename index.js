// 랜더 시작점
const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require('./config/key');

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

app.listen(port, () => console.log(`example ${port}`));

// body-parser - 서버로 request하는 통신에 사용됨 (Client에서 보내는 정보를 서버에서 가져올 수 있도록 만들어줌)
// postman - Client 역할을 해줌

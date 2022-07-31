// 랜더 시작점
const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:admin@boilerplate.mmoar.mongodb.net/?retryWrites=true&w=majority",
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

app.get("/", (req, res) => res.send("hello world! 안녕하세요"));
app.listen(port, () => console.log(`example ${port}`));

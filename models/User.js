const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt를 이용하여 비밀번호를 암호화 함

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // space를 없애주는 역할
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  // token을 통해 유효성 검사
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 유저 정보를 저장하기 전에 특정 함수를 처리할 수 있음
// next 함수를 통해 save로 넘길 수 있음
userSchema.pre("save", function (next) {
  var user = this;
  // 비밀번호 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// cb는 callback
userSchema.methods.comparePassword = (plainPassword, cb) => {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

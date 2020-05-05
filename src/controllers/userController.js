import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import Reservation from "../models/Reservation";
import nodemailer from "nodemailer";
import smtpTransporter from "nodemailer-smtp-transport";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = (req, res, user, smtpTransport) => {
  // url
  // https, http조심
  var url =
    "https://" +
    req.get("host") +
    "/confirmEmail" +
    "?key=" +
    user.keyForVerify;

  // 옵션
  var mailOpt = {
    from: "kimmins3483@gmail.com",
    to: user.email,
    subject: "이메일 인증을 진행해주세요.",
    html:
      "<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>" +
      `<a href="${url}">인증하기</a>`,
  };

  // 전송
  smtpTransport.sendMail(mailOpt, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("email has been sent.");
    }
    smtpTransport.close();
  });
  res.send(
    '<script type="text/javascript">alert("이메일을 확인하세요."); window.location="/"; </script>'
  );
};

export const getjoin = (req, res) => {
  res.render("join", {
    pageTitle: "JOIN",
  });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { email, name, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", {
      pageTitle: "JOIN",
    });
  } else {
    try {
      var keyOne = crypto.randomBytes(256).toString("hex").substr(100, 5);
      var keyTwo = crypto.randomBytes(256).toString("base64").substr(50, 5);
      var keyForVerify = keyOne + keyTwo;

      // 유저 생성
      const user = await User({
        email,
        name,
        keyForVerify,
      });

      var smtpTransport = nodemailer.createTransport(
        smtpTransporter({
          service: "Gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "kimmins3483@gmail.com",
            pass: process.env.ADMIN_EMAIL_SECRET,
          },
        })
      );

      await User.register(user, password);

      sendEmail(req, res, user, smtpTransport);

      // user값 가져올수 있다.
      // console.log("---post join part---");
      // console.log(user);

      // 키값 일치하면 confirm 함수 실행해서 인증시키고 회원가입시킨다
      // 회원가입창에 키값 폼 쓰기

      next(); // next뒤에 postLogin이 오도록 한다.
    } catch (error) {
      console.log(error);
      res.redirect(routes.home); // 바로 로그인 시킬거라서 여기 해놓음
    }
  }
};

// delete test
export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await User.findOneAndRemove({
      _id: id,
    });
  } catch (error) {
    console.log(error);
  }
  // 회원삭제를 성공하던 실패하던 홈으로 간다.
  res.redirect(routes.home);
};

export const confirm = (req, res) => {
  // console.log(req);
  User.updateOne(
    {
      keyForVerify: req.query.key,
    },
    {
      $set: {
        emailVerified: true,
      },
    },
    function (err, user) {
      // 에러처리
      if (err) {
        console.log(err);
      }
      // 일치하는 key가 없으면
      else if (user.n == 0) {
        console.log(user);
        res.send(
          '<script type="text/javascript">alert("인증실패!!"); window.location="/"; </script>'
        );
      }
      // 인증 성공
      else {
        console.log(user);
        res.send(
          '<script type="text/javascript">alert("이메일 인증이 완료되었습니다."); window.location="/"; </script>'
        );
      }
    }
  );
};

export const getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "LOGIN",
  });
};
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// 인증은 3STEP => (login, callback, post)
export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    _json: { id, email },
  } = profile;
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      user.naverID = id;
      user.save();
      return done(null, user);
    }

    const newUser = await User.create({
      email,
      keyForVerify: true,
      emailVerified: true,
      naverID: id,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  // req.user는 현재 로그인 된 사용자이다.
  const {
    params: { id },
  } = req;
  try {
    // console.log(id);
    // console.log(req.params.id); // undefined
    const user = await User.findById(req.user.id).populate("reviews");
    const reservation = await Reservation.findById(id).populate("creator");
    // console.log(reservation);
    // console.log(user);
    res.render("me", {
      pageTitle: "내 프로필",
      user,
      reservation,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    let myReservations = [1, 2, 3, 4, 5];
    myReservations.length = 0;

    // let testobj = new Schema();

    const user = await User.findById(id).populate("reviews");
    // console.log(user.myReservations.length);
    // console.log(user.myReservations[1]);
    for (let i = 0; i < user.reservations.length; i++) {
      let tmp = await Reservation.findById(user.reservations[i]);
      myReservations.push(tmp);
    }

    // console.log(myReservations);
    // console.log(user.myReservations);
    // console.log(reservation);
    res.render("userDetail", {
      pageTitle: "나의 예약 목록",
      user,
      myReservations,
    });
  } catch (error) {
    // 무작위의 id를 url에 입력한 경우에는 홈으로간다.
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "EDITPROFILE",
  });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "CHANGEPASSWORD",
  });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};

export const getReservation = (req, res) =>
  res.render("reservation", {
    pageTitle: "예약하기",
  });

export const postReservation = async (req, res) => {
  const {
    body: { phone, myName, weddingDate, reservationDate },
  } = req;
  const newReservation = await Reservation.create({
    phone,
    myName,
    weddingDate,
    reservationDate,
    creator: req.user.id,
  });
  console.log(newReservation);
  req.user.reservations.push(newReservation.id);
  req.user.save();
  res.redirect(routes.home);
};

// 200422 추가
export const sendSMS = (req, res) => {
  const dotenv = require("dotenv");
  dotenv.config();

  const { config, Group } = require("coolsms-node-sdk");

  // 인증을 위해 발급받은 본인의 API Key를 사용합니다.
  const apiKey = process.env.COOL_API_KEY;
  const apiSecret = process.env.COOL_API_SECRET;
  config.init({
    apiKey,
    apiSecret,
  });
  async function send(params = {}) {
    try {
      const response = await Group.sendSimpleMessage(params);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  const params = {
    text: "[솔라피 테스트] 안녕", // 문자 내용
    type: "SMS", // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
    to: "010123456789101112345648", // 수신번호 (받는이)
    from: process.env.COOL_MY_PHONE, // 발신번호 (보내는이)
  };
  send(params);
};

export const admin = async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({
      _id: -1,
    });
    // console.log(reservations);
    res.render("admin", {
      pageTitle: "관리자페이지",
      reservations,
    });
  } catch (error) {
    console.log(error);
    res.render("admin", {
      pageTitle: "관리자페이지",
      reservations: [],
    });
  }
};

export const about = (req, res) =>
  res.render("about", {
    pageTitle: "ABOUT",
  });

export const collection = (req, res) =>
  res.render("collection", {
    pageTitle: "COLLECTION",
  });
export const event = (req, res) =>
  res.render("event", {
    pageTitle: "EVENT",
  });
export const home = (req, res) =>
  res.render("home", {
    pageTitle: "HOME",
  });
export const momento = (req, res) =>
  res.render("momento", {
    pageTitle: "MOMENTO",
  });
export const d_vivo = (req, res) =>
  res.render("d_vivo", {
    pageTitle: "D_VIVO",
  });
export const set = (req, res) =>
  res.render("set", {
    pageTitle: "SET",
  });
export const coupleRing = (req, res) =>
  res.render("coupleRing", {
    pageTitle: "COUPLERING",
  });
export const heartBeat = (req, res) =>
  res.render("heartBeat", {
    pageTitle: "HEARTBEAT",
  });

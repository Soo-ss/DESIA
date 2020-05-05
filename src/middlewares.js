import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
import moment from "moment";
import instaImage from "./resources/js/full";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

// 업로드 아바타도 동일한 방식이다.
const multerReview = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "desiacw/images",
  }),
});

// single 인자에 html의 name부분이랑 같아야한다.
export const uploadReview = multerReview.single("imageFile");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "DESIA";
  res.locals.routes = routes;
  //   res.locals.instaImage = instaImage;
  res.locals.moment = moment;

  // passport가 user가 담긴 object를 req에도 올려준다.
  res.locals.loggedUser = req.user || null;
  //console.log(req.user.emailVerified);

  next();
};

// 로그아웃된 상태에서만 접속을 허용한다.
export const onlyPublic = (req, res, next) => {
  // 유저가 존재하는지 체크
  // 존재하면 홈으로 보내고
  // 존재하지 않으면 next()를 쓴다.(허용한다)
  //console.log(req.params.id);

  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// 다른 미들웨어 함수 만들지말고 여기서 이메일 인증여부를 진행하자
// 이메일 인증은 로그인먼저시키고 진행해야 undefined가 안뜬다
export const onlyPrivate = (req, res, next) => {
  if (req.user && req.user.emailVerified) {
    console.log(req.user.emailVerified);
    next();
  } else if (!req.user.emailVerified) {
    console.log(req.user.emailVerified);
    res.send(
      '<script type="text/javascript">alert("이메일을 인증을 진행해주세요."); window.location="/"; </script>'
    );
  } else {
    res.redirect(routes.home);
  }
};

export const onlyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    console.log(req.user.isAdmin);
    next();
  } else {
    res.redirect(routes.home);
  }
};

// 쿠키는 아주 작아야 하고 민감한 정보를 담으면 안된다.
import dotenv from "dotenv";
import passport from "passport";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import routes from "./routes";
import {
    naverLoginCallback
} from "./controllers/userController";
dotenv.config();

passport.use(User.createStrategy());

passport.use(
    new NaverStrategy({
            clientID: process.env.NAVER_ID,
            clientSecret: process.env.NAVER_SECRET,
            callbackURL: `http://localhost:4000${routes.naverCallback}`
        },
        naverLoginCallback
    )
);

// passport가 사용자 인증을 할 수 있도록 처리했다.
passport.serializeUser(User.serializeUser()); // user.id만 저장하도록 한다.
passport.deserializeUser(User.deserializeUser()); // user.id를 받아왔으면 뭘 해야하는지 여기서 한다.
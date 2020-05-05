
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import reviewRouter from "./routers/reviewRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// 만약 하나의 서버는 한국에, 다른 서버는 미국에있다면? 이 방식은 좋은 방식이 아니다.
// 이 file을 amazon cloud에 upload하고 amazon cloud에서 URL을 받아올것이다.
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // 이 방식(서버에 업로드하는 방식)이 좋은 방식은 아니다.
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/resources", express.static(path.join(__dirname, "resources")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan("dev"));
app.use(session({
    // secret은 쿠키를 해독한다.
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({mongooseConnection: mongoose.connection})
}));
// passport초기화하고 그 후에 passport가 스스로 쿠키를 들여다봐서
// 그 쿠키 정보에 해당하는 사용자를 찾아준다.
app.use(passport.initialize());
app.use(passport.session());

// for local var
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.reviews, reviewRouter);

export default app;
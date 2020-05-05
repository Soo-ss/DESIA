import express from "express";
import routes from "../routes";
import {
  home,
  reservation,
  about,
  collection,
  event,
  getjoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getMe,
  momento,
  d_vivo,
  set,
  coupleRing,
  heartBeat,
  naverLoginCallback,
  naverLogin,
  postNaverLogin,
  confirm,
  getReservation,
  postReservation
} from "../controllers/userController";
import {
  onlyPublic,
  onlyVerified,
  onlyPrivate
} from "../middlewares";
import {
  review
} from "../controllers/reviewController";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.reservation, onlyPrivate, getReservation);
globalRouter.post(routes.reservation, onlyPrivate, postReservation);

// 200317추가
globalRouter.get(routes.join, onlyPublic, getjoin);
globalRouter.post(routes.join, onlyPublic, postJoin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.confirmEmail, confirm);
globalRouter.get(routes.about, about);
globalRouter.get(routes.collection, collection);
globalRouter.get(routes.event, event);
globalRouter.get(routes.home, home);
globalRouter.get(routes.momento, momento);
globalRouter.get(routes.d_vivo, d_vivo);
globalRouter.get(routes.set, set);
globalRouter.get(routes.coupleRing, coupleRing);
globalRouter.get(routes.heartBeat, heartBeat);
// 별점?
globalRouter.get(routes.reviews, review);

globalRouter.get(routes.logout, logout);

// naver
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: "/login"
  }),
  postNaverLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
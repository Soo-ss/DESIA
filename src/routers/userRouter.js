import express from "express";
import routes from "../routes";
import {
    userDetail,
    getChangePassword,
    postChangePassword,
    getEditProfile,
    postEditProfile,
    getReservation,
    admin
} from "../controllers/userController";
import {
    onlyPrivate,
    onlyAdmin
} from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.admin, onlyPrivate, onlyAdmin, admin);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
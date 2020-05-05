import express from "express";
import routes from "../routes";
import {
    onlyPrivate,
    uploadReview
} from "../middlewares";
import {
    getUpload,
    postUpload,
    reviewDetail,
    getEditReview,
    postEditReview,
    deleteReview
} from "../controllers/reviewController";

const reviewRouter = express.Router();

// Upload
reviewRouter.get(routes.upload, onlyPrivate, getUpload);
reviewRouter.post(routes.upload, onlyPrivate, uploadReview, postUpload);

// Review Detail
reviewRouter.get(routes.reviewDetail(), reviewDetail);

// Edit Review
reviewRouter.get(routes.editReview(), onlyPrivate, getEditReview);
reviewRouter.post(routes.editReview(), onlyPrivate, postEditReview);

// Delete Review
reviewRouter.get(routes.deleteReview(), onlyPrivate, deleteReview);

export default reviewRouter;
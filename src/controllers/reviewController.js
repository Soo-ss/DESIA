import routes from "../routes";
import Review from "../models/Review";

export const review = async (req, res) => {
    try {
        const reviews = await Review.find({}).sort({
            _id: -1
        });
        res.render("review", {
            pageTitle: "REVIEW",
            reviews
        });
    } catch (error) {
        console.log(error);
        res.render("review", {
            pageTitle: "REVIEW",
            reviews: []
        });
    }
};

export const getUpload = (req, res) =>
    res.render("upload", {
        pageTitle: "UPLOAD"
    });


export const postUpload = async (req, res) => {
    const {
        body: {
            title,
            description
        },
        file: {
            location
        }
    } = req;
    try {
        const newReview = await Review.create({
            fileUrl: location,
            title,
            description,
            creator: req.user.id
        });
        console.log(newReview);
        req.user.reviews.push(newReview.id);
        req.user.save();
        res.redirect(routes.reviewDetail(newReview.id));
    } catch (error) {
        console.log(error);
        res.status(400);
        res.redirect(routes.home);
    }

};

export const reviewDetail = async (req, res) => {
    // req.params.id
    const {
        params: {
            id
        }
    } = req;
    try {
        // console.log(id);
        const review = await Review.findById(id).populate("creator");
        // console.log(review);
        review.views++;
        review.save();
        res.status(200);
        res.render("reviewDetail", {
            pageTitle: review.title,
            review
        });
    } catch (error) {
        console.log(error);
        res.status(400);
        res.redirect(routes.home);
    }
};

export const getEditReview = async (req, res) => {
    console.log(req.params.id);
    const {
        params: {
            id
        }
    } = req;
    try {
        const review = await Review.findById(id);
        console.log(review);
        if (String(review.creator) !== req.user.id) {
            throw Error();
        } else {
            res.render("editReview", {
                pageTitle: `Edit ${review.title}`,
                review
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};
export const postEditReview = async (req, res) => {
    //console.log(req.params.id);
    const {
        params: {
            id
        },
        body: {
            title,
            description
        }
    } = req;
    //console.log(req.body);
    try {
        // 저장하지 않고 바로 post한다.
        // body를 얻어와야한다.
        console.log(id, title, description);
        await Review.findOneAndUpdate({
            _id: id
        }, {
            title,
            description
        }, {
            new: false,
            upsert: true
        });
        res.redirect(routes.reviewDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const deleteReview = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const review = await Review.findById(id);
        if (String(review.creator) !== req.user.id) {
            throw Error();
        } else {
            await Review.findOneAndRemove({
                _id: id
            });
        }
    } catch (error) {
        console.log(error);
    }
    // 삭제가 성공하던 실패하던 홈으로간다.
    res.redirect(routes.home);
};
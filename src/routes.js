// Global
const ABOUT = "/about";
const COLLECTION = "/collection";
const EVENT = "/event";
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const MOMENTO = "/momento";
const D_VIVO = "/d_vivo";
const SET = "/set";
const COUPLE_RING = "/coupleRing";
const HEARTBEAT = "/heartBeat";
const CONFIRMEMAIL = "/confirmEmail";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/editProfile";
const CHANGE_PASSWORD = "/changePassword";
const ME = "/me";
const RESERVATION = "/reservation";
const ADMIN = "/admin";

// Reviews
const REVIEWS = "/reviews";
const UPLOAD = "/upload";
const REVIEW_DETAIL = "/:id"; //:potato하면 potato: 'sdfsdfsdfdsf'이런식으로 뜬다.(req.param)
const EDIT_REVIEW = "/:id/edit";
const DELETE_REVIEW = "/:id/delete";

// Naver
const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

// API는 렌더링 하지 않는다.(템플릿이 없다)

const routes = {
    about: ABOUT,
    collection: COLLECTION,
    event: EVENT,
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    me: ME,
    momento: MOMENTO,
    d_vivo: D_VIVO,
    set: SET,
    coupleRing: COUPLE_RING,
    heartBeat: HEARTBEAT,
    users: USERS,
    reservation: RESERVATION,
    admin: ADMIN,
    userDetail: id => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    reviews: REVIEWS,
    upload: UPLOAD,
    reviewDetail: id => {
        if (id) {
            return `/reviews/${id}`;
        } else {
            return REVIEW_DETAIL;
        }
    },
    editReview: id => {
        if (id) {
            return `/reviews/${id}/edit`;
        } else {
            return EDIT_REVIEW;
        }
    },
    deleteReview: id => {
        if (id) {
            return `/reviews/${id}/delete`;
        } else {
            return DELETE_REVIEW;
        }
    },
    naver: NAVER,
    naverCallback: NAVER_CALLBACK,
    confirmEmail: CONFIRMEMAIL
};

export default routes;
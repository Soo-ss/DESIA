// passport는 패스워드 체크같은거 다 알아서 해줌
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    naverID: Number,
    isAdmin: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    keyForVerify: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review" // ex. ID 1에 해당하는 리뷰를 가져온다.
    }],
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation"
    }]
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

const model = mongoose.model("User", UserSchema);

export default model;
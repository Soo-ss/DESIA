import mongoose from "mongoose";

// 데이터를 절대로 DB에 저장하지 않는다.
// image의 link를 집어 넣는다.
// amazon에 image저장
const ReviewSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0 // 처음 생성되면 조회수 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Review", ReviewSchema);
export default model;
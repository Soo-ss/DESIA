import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    phone: String,
    myName: String,
    weddingDate: Date,
    reservationDate: Date,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Reservation", ReservationSchema);
export default model;
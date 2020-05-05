import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";
dotenv.config();
import "./models/Review";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);

var server = app.listen(PORT, handleListening);

import express, { urlencoded } from "express";
const app = express();
import dotenv from "dotenv";
import { ConnectToMONGODB } from "./database.js";
import cors from 'cors'
import User from "./Routes/Register.js";
import Blog from "./Routes/Blogs.js";

app.use(cors({
  origin : 'https://blog-app-six-pi.vercel.app'
}))

dotenv.config();
ConnectToMONGODB();
app.use(express.json())
app.use(urlencoded({extended : true}))

app.use('/user', User)
app.use('/blog', Blog)

const PORT = process.env.PORT || 500
app.listen(PORT, () => {
  console.log("server is running at port " + PORT);
});

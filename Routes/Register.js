import { Router } from "express";
import Register from "../Controller/Register.js";
const router = Router();

router.post("/signup", Register.SignUp);
router.post("/signIn", Register.SignIn);
export default router;

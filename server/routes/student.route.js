import express from "express";
import { loginStudent, registerStudent, sendOTP } from "../controllers/student.controller.js";

const router = express.Router();

/* 
@Private Route : /register
@Method : POST
@Function : Create student data
*/
router.route("/register").post(registerStudent);

/* 
@Private Route : /sendOTP
@Method : POST
@Function : Send OTP on email
*/
router.route("/sendOTP").post(sendOTP);

/* 
@Private Route : /login
@Method : POST
@Function : Login Student
*/
router.route("/login").post(loginStudent);


export default router;
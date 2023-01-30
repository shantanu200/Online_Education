import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";
import { sendMail } from "../services/mail.js";
import { generateOTP } from "../services/otp.js";
import { generateToken } from "../utils/token.js";

/* Student Register Controller */
export const registerStudent = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Invalid server query");
  }

  const studentExist = await Student.findOne({ email: req.body.email });

  if (studentExist) {
    res.status(400);
    throw new Error("Student exists on these email!");
  } else {
    const student = await Student.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profilepic: req.body.profilepic,
    });

    if (student) {
      res.status(200).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        password: student.password,
        profilepic: student.profilepic,
        token: generateToken(student._id),
      });
    } else {
      res.status(400);
      throw new Error("Server side error occured");
    }
  }
});

/* OTP Send Controller */

export const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Invalid Email is entered");
  }

  const studentExist = await Student.findOne({ email });

  if (studentExist) {
    const otp = generateOTP();

    try {
      sendMail({
        to: email,
        OTP: otp,
      });

      studentExist.otp = otp;

      studentExist
        .save()
        .then(() => res.status(200).json(`OTP is send on email :: ${email}`))
        .catch((error) =>
          res.status(400).json(`Invalid Server Response :: ${error}`)
        );
    } catch (error) {
      res.status(400);
      throw new Error(`Server side error ${error}`);
    }
  }
});

/* Login Student Controller */
export const loginStudent = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(200);
    throw new Error("Invalid server query");
  }

  const { email, otp } = req.body;

  const studentexist = await Student.findOne({ email });

  if (studentexist) {
    if (studentexist.otp === otp) {
      res.status(200).json(studentexist);
    } else {
      res.status(400);
      throw new Error("Invalid OTP is entered");
    }
  } else {
    res.status(400);
    throw new Error("Student not found on these email");
  }
});

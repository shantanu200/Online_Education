import nodemailer from "nodemailer";
import { MAIL_SETTINGS } from "../constants/constant.js";

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export async function sendMail(params) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "OTP Email",
      html: `
      <div>
       <h1 style="font-size: 24px; color: #333;">Your One-Time Password</h1>
    <p style="font-size: 18px; color: #555;">Use the following password to complete your login:</p>
    <h2 style="font-size: 36px; color: #000;">${params.OTP}</h2>
    <p style="font-size: 18px; color: #555;">This password is valid for the next 10 minutes. Do not share it with anyone.</p>
    <p style="font-size: 18px; color: #555;">If you did not request this OTP, please contact support immediately.</p>
      </div>
        `,
    });

    return info;
  } catch (err) {
    return false;
  }
}

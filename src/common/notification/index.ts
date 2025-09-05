import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_CRED
  }
});

export const generateOTP = () => Math.floor(Math.random() * 900000 + 100000)
  .toString();

export const sendOTPEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: '🔐 Verify Your Email - OTP Inside!',
    text: `Your OTP for email verification is: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="color: #2d89ff;">🔹 Email Verification 🔹</h2>
        <p style="font-size: 16px; color: #555;">Use the OTP below to verify your email:</p>
        <div style="background: #2d89ff; color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px; display: inline-block; border-radius: 6px; letter-spacing: 2px;">
          ${otp}
        </div>
        <p style="margin-top: 15px; font-size: 14px; color: #777;">This OTP is valid for a limited time. Please do not share it with anyone.</p>
        <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
        <p style="font-size: 13px; color: #888;">If you did not request this, you can safely ignore this email.</p>
      </div>
    `
  });
};

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { generateOTP, sendOTPEmail, sendResponse } from '../../common';
import { MESSAGE } from '../../lib';
import { requestOtpValidation, resetPasswordValidation, userLoginValidation, userSignupValidation, verifyOtpValidation } from '../../middlewares';
import { TOKEN } from '../../models/token';
import { createUser, getUser, updateUser } from '../../services';
import { createToken } from '../../services/token';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

dotenv.config();

const otpStorage: { [email: string]: { otp: string; expiresAt: number, userData: any } } = {};

router.post('/signup', userSignupValidation, async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await getUser({ email });
    if (existingUser) {
      throw new Error(MESSAGE.ALREADY);
    }

    const otp = generateOTP();

    const hashedPassword = await bcrypt.hash(password, 10);

    otpStorage[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      userData: { name, email, password: hashedPassword }
    };

    await sendOTPEmail(email, otp);
    res.json({ success: true, message: 'OTP sent. Please verify.' });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res
      .status(500)
      .json({ error: 'Server error' });
  }
});

router.post('/verify-otp', verifyOtpValidation, async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otpStorage[email] || otpStorage[email].otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid or expired OTP' });
    }

    const { name, password } = otpStorage[email].userData;
    console.log(otpStorage[email]);
    Reflect.deleteProperty(otpStorage, email);

    const newUser = await createUser({ name, email, password });
    res
      .json({ success: true, message: 'Account created successfully!', data: newUser });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res
      .status(500)
      .json({ error: 'Server error' });
  }
});

router.post('/login', userLoginValidation, async (req: any, res) => {
  try {
    const { email, password } = req.body;
    const user: any = await getUser({email});
    if (!user) {
      throw new Error(MESSAGE.NOTFOUND);
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
      .status(401)
      .json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const uuid = uuidv4();

    const token = jwt.sign(
      { uuid, id: user._id, email: user.email },
      process.env.JWT_KEY as string,
      { expiresIn: '20d' }
    );

    await createToken({uuid, token, userId: user._id, deviceInfo: req.headers['user-agent'] || 'unknown'});
    sendResponse(res, 200, MESSAGE.SUCCESS, token);
  } catch (error: any) {
    sendResponse(res, 400, MESSAGE.ERROR, error.message);
  }
});

router.post('/request-otp', requestOtpValidation , async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getUser({ email });

    if (!user) { throw new Error(MESSAGE.NOTFOUND); }

    const otp = generateOTP();
    otpStorage[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000, userData: {} };

    await sendOTPEmail(email, otp);

    return sendResponse(res, 200, MESSAGE.SUCCESS);

  } catch (error: any) {
    return sendResponse(res, 400, error.message || MESSAGE.ERROR);
  }
});

router.post('/verify-reset-otp', verifyOtpValidation , async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otpStorage[email] || otpStorage[email].otp !== otp) {
      throw new Error(MESSAGE.INVALID);
    }

    Reflect.deleteProperty(otpStorage, email);

    const tempToken = jwt.sign({ email }, process.env.JWT_KEY || 'default_secret', { expiresIn: '10m' });

    res.json({ success: true, message: 'OTP verified successfully!', tempToken });

  } catch (error: any) {
    return sendResponse(res, 400, error.message || MESSAGE.ERROR);
  }
});

router.post('/reset-password', resetPasswordValidation, async (req, res) => {
  try {
    const { newPassword, tempToken } = req.body;

    const decoded: any = jwt.verify(tempToken, process.env.JWT_KEY || 'default_secret');
    if (!decoded.email) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUser({ email: decoded.email }, { password: hashedPassword });

    res.json({ success: true, message: 'Password updated successfully!' });

  } catch (error: any) {
    return sendResponse(res, 400, error.message || MESSAGE.ERROR);
  }
});

// This route for Google OAuth token verification
router.post('/google/callback', async (req, res) => {
  try {
    const { credential } = req.body;
    console.log('Google OAuth credential:', credential);
    if (!credential) {
      throw new Error(MESSAGE.MISSING_CRED);
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    console.log(ticket);
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error(MESSAGE.INVALID);
    }

    const email = payload.email;

    let user: any = await getUser({ googleId: payload.sub });
    if (!user) {
      user = await createUser({
        googleId: payload.sub,
        email,
        name: payload.name
      });
    }

    const uuid = uuidv4();

    const token = jwt.sign(
      { uuid, id: user._id, email: user.email },
      process.env.JWT_KEY as string,
      { expiresIn: '20d' }
    );

    await createToken({uuid, token, userId: user._id, deviceInfo: req.headers['user-agent'] || 'unknown'});

    return sendResponse(res, 200, MESSAGE.SUCCESS, token);

  } catch (err: any) {
    return sendResponse(res, 500, err.message || MESSAGE.ERROR);
  }
});

router.get('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error(MESSAGE.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_KEY || 'default_secret');

    if (!decoded) {
      throw new Error(MESSAGE.INVALID_TOKEN);
    }

    await TOKEN.deleteOne({ uuid: decoded.uuid });
    sendResponse(res, 200, MESSAGE.SUCCESS);
  } catch (error: any) {
    sendResponse(res, 400, MESSAGE.ERROR, error.message);
  }
});

export const authController = router;

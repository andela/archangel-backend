import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADD,
    pass: process.env.EMAIL_PASS
  }
});


export const usePasswordHashToMakeToken = ({
  password: passwordHash,
  id: userId,
  createdAt
}) => {
  const secret = `${passwordHash - createdAt}`;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600 // 1 hour
  });
  return token;
};


export const getPasswordResetURL = (user, token) => `http://localhost:5000/password/reset/${user.id}/${token}`;

export const resetPasswordTemplate = (user, url) => {
  const from = 'bakaretemitayo712@gmail.com';
  const to = user.email;
  const subject = 'Barefoot Nomad Password Reset';
  const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>We heard that you lost your Barefoot nomad password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Barefoot Nomad</p>
  `;
  return { from, to, subject, html } 
}
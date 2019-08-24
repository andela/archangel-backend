import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import transporter from '../config/nodemailerConfig';

dotenv.config();


export const sendToken = (req, res) => {
    const token = jwt.sign({
        id: req.body.id,
    }, process.env.JWT_EMAIL_SECRET, { expiresIn: '1d' });

    const url = `http://localhost:5000/api/v1/confirmation/${token}`;
    transporter.sendMail({
        to: req.body.email,
        subject: 'Confirm Email',
        html: `please, click the link to confirm email: <a href="${url}">${url}</a>`
    });
    res.status(200).json({
        message: 'Email successfully sent'
    });
};

export const verifyToken = (req, res) => {
    const verfy = jwt.verify(req.params.token, process.env.JWT_EMAIL_SECRET);
    res.status(200).json({
        message: 'Email verified'
    });
};

import nodemailer from "nodemailer";

export const sendEmail = async (
    to: string,
    subject: string,
    text: string
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email provider
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });
    
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });
};

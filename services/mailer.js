import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.G_USER,
    pass: process.env.G_APP_PASS,
  },
});

const sendMail = async (reciver, subject) => {
  const { name, email, registerationLink } = reciver;
  try {
    const mail = await transporter.sendMail({
      to: email,
      subject: subject,
      html: `<h1>${registerationLink}</h1>`,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default sendMail;

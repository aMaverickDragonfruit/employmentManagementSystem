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

const sendMail = async (receiver, subject) => {
  const { name, email, registrationLink } = receiver;
  const visaLink = 'http://localhost:3001/visa-management';
  let emailContent = '';

  if (subject === 'Onboarding Application') {
    emailContent = `
      <p>Dear ${name},</p>
      <p>We are happy to have you joined iKunKun Business Int. You will need to sign up your account to complete your onboarding application.</p>
      <p>Click <a href=${registrationLink}>here</a> to sign up your account. The registration link expires in 3 hours. Please sign up your account at your earliest convenience. Thank you.</p>
      <p>Best regards</p>
      <p>iKunKun HR Department</p>
    `;
  } else if (subject === 'Onboarding Reminder') {
    emailContent = `
    <p>Dear ${name},</p>
    <p>This is an email to reminder for you to sign up your account and complete the onboarding application.</p>
    <p>Click <a href=${registrationLink}>here</a> to sign up your account. The registration link expires in 3 hours. Please sign up your account at your earliest convenience. Thank you.</p>
    <p>Best regards</p>
    <p>iKunKun HR Department</p>
  `;
  } else {
    emailContent = `
    <p>Dear ${name},</p>
    <p>Your application visa status has been updated!</p>
    <p>Please click <a href=${visaLink}>here</a> to view your next step.</p>
    <p>Best regards</p>
    <p>iKunKun HR Department</p>
  `;
  }

  try {
    const mail = await transporter.sendMail({
      to: email,
      subject: subject,
      html: `${emailContent}`,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default sendMail;

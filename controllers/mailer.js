import sendMail from '../services/mailer.js';

export const mailSender = async (req, res) => {
  const { receiver, subject } = req.body;

  try {
    await sendMail(receiver, subject);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};

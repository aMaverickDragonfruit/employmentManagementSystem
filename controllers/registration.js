import jwt from 'jsonwebtoken';
import Registration from '../models/Registration.js';
import sendMail from '../services/mailer.js';

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params?.id);
    res.status(200).json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createRegistration = async (req, res) => {
  const { firstName, middleName, lastName, email } = req.body;
  let fullName = [];
  const token = jwt.sign(
    {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  );
  const registrationLink = `http://localhost:3001/register/${token}`;

  if (!middleName) {
    fullName = [firstName, lastName].join(' ').toString();
  } else {
    fullName = [firstName, middleName, lastName].join(' ').toString();
  }
  let newRegistration = {};
  try {
    newRegistration = await Registration.findOne({ email });
    // if registration does not exist
    if (!newRegistration) {
      newRegistration = await Registration.create({
        name: fullName,
        registrationLink,
        email,
      });
    } else {
      // newRegistration.name = fullName;
      newRegistration.registrationLink = registrationLink;
      newRegistration.status = false;
      newRegistration.save();
    }

    await sendMail(newRegistration, 'Onboarding Application');

    res.status(200).json(newRegistration);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params?.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(registration);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params?.id);

    res.status(200).json({ message: 'Registration deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

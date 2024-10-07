import User from '../models/User.js';
import Profile from '../models/Profile.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName }); //short for {userName: userName}
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user._id.toString(),
      firstName: user.firstName,
      middleName: user.middleName || '',
      lastName: user.lastName,
      isHR: user.isHR,
    };

    const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'User logged in successfully',
      token,
      id: user._id.toString,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { firstName, middleName, lastName, email, userName, password, isHR } =
    req.body;

  try {
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      userName,
      password,
    });

    const newProfile = await Profile.create({
      user: newUser._id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      profile: newProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

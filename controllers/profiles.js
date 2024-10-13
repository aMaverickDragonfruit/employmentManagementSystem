import Profile from '../models/Profile.js';

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getCurUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params?.id);
    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params?.id });
    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

//update the current user profile by user ID
export const updateCurUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user?.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params?.id, req.body, {
      new: true,
    });
    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.params?.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProfileDocStatusByUserId = async (req, res) => {
  try {
    const { userId, fileType, newStatus, feedback } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      {
        user: userId,
        'documents.fileType': fileType,
      },
      {
        $set: {
          'documents.$.status': newStatus,
          'documents.$.feedback': feedback,
        },
      },
      { new: true }
    );

    if (!updatedProfile) {
      res.status(404).json({ message: 'Profile or document not found.' });
    }

    res.status(200).json(updatedProfile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateCurUserProfileDoc = async (req, res) => {
  try {
    const { fileType, fileName, fileUrl } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      {
        user: req.user?.id,
        'documents.fileType': fileType,
      },
      {
        $set: {
          'documents.$.fileName': fileName,
          'documents.$.fileUrl': fileUrl,
          'documents.$.status': 'Pending',
        },
      },
      { new: true }
    );
    if (!updatedProfile) {
      res
        .status(404)
        .json({ message: 'Profile or document file type not found.' });
    }

    res.status(200).json(updatedProfile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

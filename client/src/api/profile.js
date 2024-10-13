import api from './base';

const BASE_URL = '/profiles';

export const getProfiles = async () => {
  try {
    const response = await api.get(BASE_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee registrations:', err);
    throw err;
  }
};

export const getCurUserProfile = async () => {
  try {
    const response = await api.get(`${BASE_URL}/me`);
    return response.data;
  } catch (err) {
    console.error('Error fetching current logged in user profile:', err);
    throw err;
  }
};

export const getProfileById = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee profile by id:', err);
    throw err;
  }
};

export const getProfileByUserId = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee profile by id:', err);
    throw err;
  }
};

export const updateCurUserProfile = async (data) => {
  try {
    const response = await api.put(`${BASE_URL}/me`, data);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee profile by id:', err);
    throw err;
  }
};

export const updateProfileById = async (id, data) => {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee profile by id:', err);
    throw err;
  }
};

export const updateProfileByUserId = async (id, data) => {
  try {
    const response = await api.put(`${BASE_URL}/user/${id}`, data);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee profile by id:', err);
    throw err;
  }
};

export const updateProfileDocStatusByUserId = async (data) => {
  try {
    const response = await api.put(`${BASE_URL}/documents/status`, data);
    return response.data;
  } catch (err) {
    console.error(
      'Error updating employee profile document status by id:',
      err
    );
    throw err;
  }
};

export const updateCurUserProfileDoc = async (data) => {
  try {
    const response = await api.put(`${BASE_URL}/me/documents`, data);
    return response.data;
  } catch (err) {
    console.error('Error updating current employee profile document', err);
    throw err;
  }
};

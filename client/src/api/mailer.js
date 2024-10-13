import api from './base';

const BASE_URL = '/send-email';

export const sendMail = async (receiver, subject) => {
  const reqDate = { receiver, subject };
  try {
    const response = await api.post(BASE_URL, reqDate);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee registrations:', err);
    throw err;
  }
};

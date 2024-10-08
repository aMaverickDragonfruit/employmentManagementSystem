import api from './base';

const BASE_URL = '/registrations';

export const getRegistrations = async () => {
  try {
    const response = await api.get(BASE_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee registrations:', err);
    throw err;
  }
};

// export const getRegistrationById = async (id) => {
//   try {
//     const response = await api.get(`${BASE_URL}/${id}`);
//     return response.data;
//   } catch (err) {
//     console.error('Error fetching employee registration by id:', err);
//     throw err;
//   }
// };

export const createRegistration = async (data) => {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data;
  } catch (err) {
    console.error('Error fetching employee registration by id:', err);
    throw err;
  }
};

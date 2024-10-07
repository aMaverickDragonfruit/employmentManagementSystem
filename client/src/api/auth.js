import api from './base';

const API_URL = '/auth';

export const login = async ({ userName, password }) => {
  const response = await api.post(`${API_URL}/lgoin`, { userName, password });

  return response.data;
};

export const signup = async ({ userName, password }) => {
  const response = await api.post(`${API_URL}/resgister`, {
    userName,
    password,
  });

  return response.data;
};

import api from './base';

const API_URL = '/auth';

export const login = async ({ userName, password }) => {
  const response = await api.post(`${API_URL}/login`, { userName, password });

  return response.data;
};

export const signup = async ({ userName, password, registerToken }) => {
  const response = await api.post(`${API_URL}/register/${registerToken}`, {
    userName,
    password,
  });

  return response.data;
};

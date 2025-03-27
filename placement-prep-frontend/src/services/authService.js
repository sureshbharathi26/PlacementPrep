import api from './api';

const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post('/api/auth/login', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

export default { register, login, logout };

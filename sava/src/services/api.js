import axios from 'axios';

const API_URL = 'http://localhost:5101';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async (nombre, email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/registro`, { nombre, email, password });
  return response.data;
};

export const getUsuarios = async () => {
  const response = await axios.get(`${API_URL}/api/usuarios`);
  return response.data;
};

export const getTickets = async () => {
  const response = await axios.get(`${API_URL}/api/tickets`);
  return response.data;
};

export const createUser = async (correo, nombre, cargo, area, perfil) => {
  const response = await axios.post(`${API_URL}/api/crearusuario`, { correo, nombre, cargo, area, perfil });
  return response.data;
};

export const validarTicket = async (ticketId) => {
  const response = await axios.post(`${API_URL}/api/tickets/validar-ticket`, { ticketId });
  return response.data;
};

export const consumirTicket = async (ticketId) => {
  const response = await axios.post(`${API_URL}/api/tickets/consumir-ticket`, { ticketId });
  return response.data;
};

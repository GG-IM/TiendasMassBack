import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pedidos'; // Ajusta según tu backend

export const crearPedido = async (pedidoData) => {
  const response = await axios.post(API_URL, pedidoData);
  return response.data;
};

export const obtenerPedido = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarPedido = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const eliminarPedido = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

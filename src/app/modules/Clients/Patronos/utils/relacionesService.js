import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const RELACIONES_URL = `${API_URL}/clients/patronos/relacion`;

// Obtener todas las relaciones patrono-cliente
export function getAllRelaciones() {
  return axios.get(RELACIONES_URL);
}

// Crear una nueva relación patrono-cliente
export function createRelacion(patronoId, clienteId) {
  return axios.post(RELACIONES_URL, {
    idpatrono: Number(patronoId),
    idcliente: Number(clienteId),
  });
}

// Eliminar una relación patrono-cliente
export function deleteRelacion(relacionId) {
  return axios.delete(`${RELACIONES_URL}/${relacionId}`);
}

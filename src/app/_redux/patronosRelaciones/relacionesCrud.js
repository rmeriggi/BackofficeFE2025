import axios from "axios";

export const RELACIONES_URL = "http://localhost:3005/clients/patronos/relacion";

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

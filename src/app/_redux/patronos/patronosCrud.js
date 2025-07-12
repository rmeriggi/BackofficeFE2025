import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const PATRONOS_URL = `${API_URL}/clients/patronos`;

// Obtener todos los patronos
export function getAllPatronos(search = "*") {
  return axios.get(`${PATRONOS_URL}?search=${search}`);
}

// Obtener un patrono por ID
export function getPatronoById(patronoId) {
  return axios.get(`${PATRONOS_URL}/${patronoId}`);
}

// Crear un nuevo patrono
export function createPatrono(patrono) {
  return axios.post(PATRONOS_URL, patrono);
}

// Actualizar un patrono
export function updatePatrono(patrono) {
  return axios.put(`${PATRONOS_URL}/${patrono.id}`, patrono);
}

// Eliminar un patrono
export function deletePatrono(patronoId) {
  return axios.delete(`${PATRONOS_URL}/${patronoId}`);
}

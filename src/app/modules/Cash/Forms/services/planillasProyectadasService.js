import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = `${API_URL}/clients/patronos`;

// Obtener planillas proyectadas por patrono
export const getPlanillasProyectadas = async (idPatrono) => {
  try {
    const response = await axios.get(`${BASE_URL}/${idPatrono}/planillas-proy`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener planillas proyectadas:", error);
    throw error;
  }
};

export default getPlanillasProyectadas;

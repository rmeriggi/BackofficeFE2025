import axios from "axios";

const BASE_URL = "http://localhost:3005/clients/patronos";

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

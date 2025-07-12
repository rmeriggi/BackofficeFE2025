import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const planillasRecibidasService = {
  // Obtener planillas recibidas de un patrón
  async getPlanillasRecibidas(idpatrono = 0) {
    try {
      const response = await axios.get(
        `${API_URL}/clients/patronos/${idpatrono}/planillas-recibidas`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener planillas recibidas:", error);
      throw error;
    }
  },
};

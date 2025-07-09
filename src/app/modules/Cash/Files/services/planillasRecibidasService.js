import axios from "axios";

export const planillasRecibidasService = {
  // Obtener planillas recibidas de un patrón
  async getPlanillasRecibidas(idpatrono = 0) {
    try {
      const response = await axios.get(
        `http://localhost:3005/clients/patronos/${idpatrono}/planillas-recibidas`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener planillas recibidas:", error);
      throw error;
    }
  },
};

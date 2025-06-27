import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getCajaMovimientos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cash/caja-movimientos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener movimientos de caja:", error);
    throw error;
  }
};

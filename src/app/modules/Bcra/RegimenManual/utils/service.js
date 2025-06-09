import axios from "axios";

export const ADJUST_URLS = {
  PROCESO_A: `${process.env.REACT_APP_API_URL}/bcra_A_proceso`,
  PROCESO_B: `${process.env.REACT_APP_API_URL}/bcra_B_proceso`,
  ARCHIVOS_XML: `${process.env.REACT_APP_API_URL}/archivosxml`,
  BCRA_PADRON: `${process.env.REACT_APP_API_URL}/BCRA_Padron`,
};

export const seatAproceso = async (values) => {
  const response = await axios.post(ADJUST_URLS.PROCESO_A, values);
  return response.data;
};

export const seatBproceso = async (values) => {
  const response = await axios.post(ADJUST_URLS.PROCESO_B, values);
  return response.data;
};

export const seatArchivos = async (values) => {
  const response = await axios.post(ADJUST_URLS.ARCHIVOS_XML, values);
  return response.data;
};

export const seatPadron = async (values) => {
  const response = await axios.post(ADJUST_URLS.BCRA_PADRON, values);
  return response.data;
};

import axios from "axios";
 
export const CLIENTS_URLS = {
  GET_ALL: `${process.env.REACT_APP_API_URL}/investments/clients`,
  GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/clients/investment/${id}`,
  GET_INVERSION: (id) => `${process.env.REACT_APP_API_URL}/investments/clients/dashboard/${id}`,
  GET_ACCUMULATED_INTEREST: (id) => `${process.env.REACT_APP_API_URL}/investments/clients/${id}/dashboard`,
}

export const getAll = async() => {
  const response = await axios.get(CLIENTS_URLS.GET_ALL);
  return response.data;
}

export const getOne = async(id) => {
  const response = await axios.get(CLIENTS_URLS.GET_ONE(id));
  return response.data;
}

export const getInversion = async(id) => {
  const response = await axios.get(CLIENTS_URLS.GET_INVERSION(id));
  return response.data;
}

export const getAccumulatedInterest = async(id, req) => {
  const response = await axios.post(CLIENTS_URLS.GET_ACCUMULATED_INTEREST(id), req);
  return response.data;
}
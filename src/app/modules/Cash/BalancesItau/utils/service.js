import axios from "axios";

export const ITAU_URLS = {
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/cash/balances/${id}`,
    CREATE:`${process.env.REACT_APP_API_URL}/cash/balances-create`,
    GET:`${process.env.REACT_APP_API_URL}/cash/balances`,
    DELETE: (id) => `${process.env.REACT_APP_API_URL}/cash/balances/${id}`,
    GET_ONE : (id) => `${process.env.REACT_APP_API_URL}/cash/balances/${id}`
}

export const editBalanceItau = async(id,values) => {
    const response = await axios.post(ITAU_URLS.EDIT(id), values);
    return response.data;
}

export const getBalancesItau = async(values) => {
  const response = await axios.post(ITAU_URLS.GET, values);
  return response.data;
}

export const createBalanceItau = async(values) => {
  const response = await axios.post(ITAU_URLS.CREATE, values);
  return response.data;
}

export const deleteBalanceItau = async(id) => {
  const response = await axios.delete(ITAU_URLS.DELETE(id));
  return response.data;
}

export const getOneBalanceItau = async(id) => {
  const response = await axios.get(ITAU_URLS.GET_ONE(id));
  return response.data;
}
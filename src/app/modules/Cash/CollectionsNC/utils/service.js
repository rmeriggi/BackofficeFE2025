import axios from "axios";

export const ITAU_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cash/nccollections`,
    GET_CLIENT_BY_DNI: (dni) => `${process.env.REACT_APP_API_URL}/clientsByPassport/${dni}`,
    INPUT_PAYMENT: `${process.env.REACT_APP_API_URL}/cash/nccollections`,
}

export const getCollections = async(values) => {
    const response = await axios.get(ITAU_URLS.GET, values);
    return response.data;
}

export const getClientByPassport = async(dni) => {
    const response = await axios.get(ITAU_URLS.GET_CLIENT_BY_DNI(dni));
    return response.data;
}

export const inputPayment = async(values) => {
    const response = axios.post(ITAU_URLS.INPUT_PAYMENT, values)
    return response.data
}
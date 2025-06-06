import axios from "axios";

export const GENERAL_URLS = {
  GET_CURRENCIES:`${process.env.REACT_APP_API_URL}/currency`,
  GET_COUNTRIES:`${process.env.REACT_APP_API_URL}/countries`,
  GET_ENTITIES: `${process.env.REACT_APP_API_URL}/entities`,
  GET_WALLETS:`${process.env.REACT_APP_API_URL}/blotter/wallets`,
  GET_OPERATIONS:`${process.env.REACT_APP_API_URL}/blotter/operations`,
  GET_SPECIES:`${process.env.REACT_APP_API_URL}/blotter/species`,
  GET_DEADLINE:`${process.env.REACT_APP_API_URL}/blotter/deadlines`,
  GET_COUNTERPARTIES:`${process.env.REACT_APP_API_URL}/blotter/counterparties`,
  GET_MARKETS:`${process.env.REACT_APP_API_URL}/blotter/markets`,
  GET_OPERATORS:`${process.env.REACT_APP_API_URL}/blotter/operators`,
  GET_COINS:`${process.env.REACT_APP_API_URL}/blotter/coins`,
  GET_SUPPLIERS_CATEGORY:`${process.env.REACT_APP_API_URL}/supplier/categories`,
  GET_SUPPLIERS_CC:`${process.env.REACT_APP_API_URL}/supplier/cost_centers`,
}


export const getSuppliersCategory = async() => {
  const response = await axios.get(GENERAL_URLS.GET_SUPPLIERS_CATEGORY);
  return  response.data
}

export const getSuppliersCC = async() => {
  const response = await axios.get(GENERAL_URLS.GET_SUPPLIERS_CC);
  return  response.data
}

export const getEntities = async() => {
  const response = await axios.get(GENERAL_URLS.GET_ENTITIES);
  return  response.data
}

export const getCurrencies = async () => {
  const response = await axios.get(GENERAL_URLS.GET_CURRENCIES);
  return response.data;
}

export const getCountries = async () => {
  const response = await axios.get(GENERAL_URLS.GET_COUNTRIES);
  return response.data;
}

export const getWallets = async () => {
  const response = await axios.get(GENERAL_URLS.GET_WALLETS);
  return response.data;
}

export const getOperations = async () => {
  const response = await axios.get(GENERAL_URLS.GET_OPERATIONS);
  return response.data;
}

export const getSpecies = async () => {
  const response = await axios.get(GENERAL_URLS.GET_SPECIES);
  return response.data;
}

export const getDeadline = async () => {
  const response = await axios.get(GENERAL_URLS.GET_DEADLINE);
  return response.data;
}

export const getCounterparties = async () => {
  const response = await axios.get(GENERAL_URLS.GET_COUNTERPARTIES);
  return response.data;
}

export const getMarkets = async () => {
  const response = await axios.get(GENERAL_URLS.GET_MARKETS);
  return response.data;
}

export const getOperators = async () => {
  const response = await axios.get(GENERAL_URLS.GET_OPERATORS);
  return response.data;
}

export const getCoins = async () => {
  const response = await axios.get(GENERAL_URLS.GET_COINS);
  return response.data;
}



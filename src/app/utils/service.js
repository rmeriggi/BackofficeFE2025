import axios from "axios";
import { loadAbort } from "./loadAbort";
// import { loadAbort } from "./loadAbort";

export const GENERAL_URLS = {
  GET_TRXTYPE: `${process.env.REACT_APP_API_URL}/trxTypes`,
  GET_CURRENCIES: `${process.env.REACT_APP_API_URL}/currency`,
  GET_COUNTRIES: `${process.env.REACT_APP_API_URL}/countries`,
  GET_TRANSACTIONS: `${process.env.REACT_APP_API_URL}/transactions/types`,
  GET_TRANSACTIONS_FOR_ACCUSATIONS: `${process.env.REACT_APP_API_URL}/transactions/forAccusations`,
  GET_ENTITIES: `${process.env.REACT_APP_API_URL}/entities`,
  GET_ALL_CREDIT_STATUS: `${process.env.REACT_APP_API_URL}/creditStatus`,
  GET_USERS: `${process.env.REACT_APP_API_URL}/users`,
  GET_ALL_QUOTA_STATUS: `${process.env.REACT_APP_API_URL}/statusQuotas`,
};

export const getTrxType = async () => {
  const response = await axios.get(GENERAL_URLS.GET_TRXTYPE);
  return response.data;
};

export const getCurrencies = async () => {
  const response = await axios.get(GENERAL_URLS.GET_CURRENCIES);
  return response.data;
};

export const getCountries = async () => {
  const response = await axios.get(GENERAL_URLS.GET_COUNTRIES);
  return response.data;
};

export const getTransactions = async (values) => {
  const response = await axios.post(GENERAL_URLS.GET_TRANSACTIONS, values);
  return response.data;
};

export const getTransactionsForAccusations = async (values) => {
  const response = await axios.post(
    GENERAL_URLS.GET_TRANSACTIONS_FOR_ACCUSATIONS,
    values
  );
  return response.data;
};

export const getEntities = async () => {
  const response = await axios.get(GENERAL_URLS.GET_ENTITIES);
  return response.data;
};

export const getAllUsers = () => {
  const controller = loadAbort();
  return {
    call: axios.get(GENERAL_URLS.GET_USERS, { signal: controller.signal }),
    controller,
  };
};

export const getAllStatusQuota = async () => {
  const response = await axios.get(GENERAL_URLS.GET_ALL_QUOTA_STATUS);
  return response.data;
};

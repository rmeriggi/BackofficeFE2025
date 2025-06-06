import axios from "axios";

export const TRANSACTIONS_URLS = {
  GET: `${process.env.REACT_APP_API_URL}/transactions`,
  GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/transactions/${id}`,
  GET_REPORT: `${process.env.REACT_APP_API_URL}/transactions/transactionsTypes`,
  REVERSAR: (id) =>
    `${process.env.REACT_APP_API_URL}/transactions/reversar/${id}`,
  MAKE_ACCUSATION: (id) =>
    `${process.env.REACT_APP_API_URL}/transactions/accusation/${id}`,
};

export const getAlLTransactions = async () => {
  const response = await axios.get(TRANSACTIONS_URLS.GET);
  return response.data;
};

export const getOneTransaction = async (id) => {
  const response = await axios.get(TRANSACTIONS_URLS.GET_ONE(id));
  return response.data;
};

export const getReport = async (values) => {
  const response = await axios.post(TRANSACTIONS_URLS.GET_REPORT, values);
  return response.data;
};

export const reversarTransaction = async (id) => {
  const response = await axios.post(TRANSACTIONS_URLS.REVERSAR(id));
  return response.data;
};

export const makeAccusation = async (id, idextrasource, reference) => {
  const response = await axios.post(TRANSACTIONS_URLS.MAKE_ACCUSATION(id), {
    idextrasource,
    reference,
  });
  return response.data;
};

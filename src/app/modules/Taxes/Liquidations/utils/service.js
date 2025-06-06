import axios from "axios";
 
export const LIQUIDATIONS_URLS = {
  GET_SUM: `${process.env.REACT_APP_API_URL}/transactions/sum`,
  GET_TRANSACTIONS_TYPES: `${process.env.REACT_APP_API_URL}/taxes/liquidationsTypes`,
}

export const getSum = async(values) => {
  const response = await axios.post(LIQUIDATIONS_URLS.GET_SUM, values);
  return response.data;
}

export const getTransactionsTypes = async(values) => {
  const response = await axios.post(LIQUIDATIONS_URLS.GET_TRANSACTIONS_TYPES, values);
  return response.data;
}
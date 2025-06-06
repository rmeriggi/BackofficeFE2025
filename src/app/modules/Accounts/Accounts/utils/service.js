import axios from "axios";

export const ACCOUNTS_URLS = {
  GET: (search) => `${process.env.REACT_APP_API_URL}/accounts?search=${search}`,
  GET_LIST: (type) =>
    `${process.env.REACT_APP_API_URL}/accountsList?type=${type}`,
  GET_TRANSACTIONS: (id) =>
    `${process.env.REACT_APP_API_URL}/accounts/${id}/transactions`,
  GET_ONE_TRANSACTION: (id) =>
    `${process.env.REACT_APP_API_URL}/transactions/${id}`,
  GET_ONE_ACCOUNT: (id) => `${process.env.REACT_APP_API_URL}/accountsOne/${id}`,
  GET_EXTRACT: (id) =>
    `${process.env.REACT_APP_API_URL}/accounts/${id}/extract`,
  GET_EXTRACT_BALANCES: (id) =>
    `${process.env.REACT_APP_API_URL}/accounts/${id}/extractBalances`,
  ADJUST_ACCOUNT_CREDIT: (id) =>
    `${process.env.REACT_APP_API_URL}/accounts/${id}/adjustAccountCredit`,
  ADJUST_ACCOUNT_DEBIT: (id) =>
    `${process.env.REACT_APP_API_URL}/accounts/${id}/adjustAccountDebit`,
  GET_ALL_ACCUSATION: `${process.env.REACT_APP_API_URL}/transactions/accusations`,
};

export const getAllAccounts = async (search = "*") => {
  const response = await axios.get(ACCOUNTS_URLS.GET(search));
  return response.data;
};

export const getAllAccountsList = async (type) => {
  const response = await axios.get(ACCOUNTS_URLS.GET_LIST(type));
  return response.data;
};

export const getAllTransactions = async (id) => {
  const response = await axios.get(ACCOUNTS_URLS.GET_TRANSACTIONS(id));
  return response.data;
};

export const getOneTransaction = async (id) => {
  const response = await axios.get(ACCOUNTS_URLS.GET_ONE_TRANSACTION(id));
  return response.data;
};

export const getOneAccount = async (id) => {
  const response = await axios.get(ACCOUNTS_URLS.GET_ONE_ACCOUNT(id));
  return response.data;
};

export const getExtract = async (id, values) => {
  const response = await axios.post(ACCOUNTS_URLS.GET_EXTRACT(id), values);
  return response.data;
};

export const getExtractBalances = async (id, values) => {
  const response = await axios.post(
    ACCOUNTS_URLS.GET_EXTRACT_BALANCES(id),
    values
  );
  return response.data;
};

export const adjustAccountCredit = async (id, amount) => {
  const response = await axios.post(ACCOUNTS_URLS.ADJUST_ACCOUNT_CREDIT(id), {
    amount,
  });
  return response.data;
};

export const adjustAccountDebit = async (id, amount) => {
  const response = await axios.post(ACCOUNTS_URLS.ADJUST_ACCOUNT_DEBIT(id), {
    amount,
  });
  return response.data;
};

export const getAllAccusations = async () => {
  const response = await axios.get(ACCOUNTS_URLS.GET_ALL_ACCUSATION);
  return response.data;
};

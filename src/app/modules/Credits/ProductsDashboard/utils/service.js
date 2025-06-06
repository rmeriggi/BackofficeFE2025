import axios from "axios";
 

export const DASHBOARD_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/dashboardCollections`,
    GET_TRANSACTIONS: `${process.env.REACT_APP_API_URL}/transactions/types`,
}

export const getDashboardInfo = async(values) => {
    const response = await axios.post(DASHBOARD_URLS.GET, values);
    return response.data;
}

export const getTransactions = async(values) => {
  const response = await axios.post(DASHBOARD_URLS.GET_TRANSACTIONS, values);
  return response.data;
}




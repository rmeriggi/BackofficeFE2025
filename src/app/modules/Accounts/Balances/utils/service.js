import axios from "axios";
 
export const BALANCES_URLS = {
    GET_LIST: `${process.env.REACT_APP_API_URL}/accountsBalances`,
    GET_SUM: `${process.env.REACT_APP_API_URL}/accountsBalancesTotal`,
}

export const getBalances = async(values) => {
    const response = await axios.post(BALANCES_URLS.GET_LIST, values);
    return response.data;
}

export const getSum = async (values) => {
    const response = await axios.post(BALANCES_URLS.GET_SUM, values);
    return response.data;
}
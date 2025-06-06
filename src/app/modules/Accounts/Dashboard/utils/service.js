import axios from "axios";
 
export const BALANCES_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/dashboardAccounts`,
}

export const getAllBalances = async(values) => {
    const response = await axios.post(BALANCES_URLS.GET, values);
    return response.data;
}

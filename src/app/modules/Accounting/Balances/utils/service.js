import axios from 'axios';

export const BALANCES_URLS = {
    GET_LIST: `${process.env.REACT_APP_API_URL}/sumsAndBalances`,
}

export const getBalancesListData = async(values) => {
    try {
        const response = await axios.post(BALANCES_URLS.GET_LIST, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
} 
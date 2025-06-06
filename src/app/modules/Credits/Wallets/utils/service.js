import axios from 'axios';
 
export const WALLET_URLS = {
    GET_ALL_QUOTA_STATUS: `${process.env.REACT_APP_API_URL}/statusQuotas`,
    GET_ASSIGN_WALLET_DATA: `${process.env.REACT_APP_API_URL}/totalToAssign`,
    ASSIGN_WALLET: `${process.env.REACT_APP_API_URL}/credits/asignWallet`,
}

export const getAssignWalletData = async() => {
    const response = await axios.get(WALLET_URLS.GET_ASSIGN_WALLET_DATA);
    return response.data;
}

export const getAllQuotaStatus = async() => {
    const response = await axios.get(WALLET_URLS.GET_ALL_QUOTA_STATUS);
    return response.data;
}

export const assignWallet = async(values) => {
    const response = await axios.post(WALLET_URLS.ASSIGN_WALLET, values);
    return response.data;
}
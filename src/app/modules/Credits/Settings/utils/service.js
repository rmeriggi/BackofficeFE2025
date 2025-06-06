import axios from 'axios';
 
export const WALLET_URLS = {
    GET_ALL_PRODUCT_TYPES: `${process.env.REACT_APP_API_URL}/products`,
    GET_ALL_CREDIT_STATUSES: `${process.env.REACT_APP_API_URL}/creditStatus`,
    GET_ALL_MANAGERS: `${process.env.REACT_APP_API_URL}/managers`,
    GET_ASSIGN_WALLET_DATA: `${process.env.REACT_APP_API_URL}/assignWalletData`,
    ASSIGN_WALLET: `${process.env.REACT_APP_API_URL}/assignWallet`,
    CREATE_ONE_USER: `${process.env.REACT_APP_API_URL}/users`,
    COLLECTION_ADJUSMENT_INSTALLMENTS_LIST: `${process.env.REACT_APP_API_URL}/collectionAdjustments`,
    FORGIVE_DEBT: `${process.env.REACT_APP_API_URL}/forgiveDebtV3`,
    ASSIGN_LOST: `${process.env.REACT_APP_API_URL}/assignLostV3`,
    FORGIVE_DEBT_QUOTA: (id) => `${process.env.REACT_APP_API_URL}/quotaForgiveDebt/${id}`,
    ASSIGN_LOST_QUOTA: (id) => `${process.env.REACT_APP_API_URL}/quotaAssignLost/${id}`,
}

export const getAssignWalletData = async() => {
    const response = await axios.get(WALLET_URLS.GET_ASSIGN_WALLET_DATA);
    return response.data;
}

export const getAllProducts = async() => {
    const response = await axios.get(WALLET_URLS.GET_ALL_PRODUCT_TYPES);
    return response.data;
}

export const getAllCreditStatuses = async() => {
    const response = await axios.get(WALLET_URLS.GET_ALL_CREDIT_STATUSES);
    return response.data;
}

export const getAllManagers = async() => {
    const response = await axios.get(WALLET_URLS.GET_ALL_MANAGERS);
    return response.data;
}

export const assignWallet = async(values) => {
    const response = await axios.post(WALLET_URLS.ASSIGN_WALLET, values);
    return response.data;
}

export const createOneUser = async(values) => {
    const response = await axios.post(WALLET_URLS.CREATE_ONE_USER, values);
    return response.data;
}

export const getInstallmentsList = async(values) => {
    const response = await axios.post(WALLET_URLS.COLLECTION_ADJUSMENT_INSTALLMENTS_LIST, values);
    return response.data
}

export const forgiveDebt = async(values) => {
    const response = await axios.post(WALLET_URLS.FORGIVE_DEBT, values);
    return response.data
}

export const assignLost = async(values) => {
    const response = await axios.post(WALLET_URLS.ASSIGN_LOST, values);
    return response.data
}

export const forgiveDebtQuota = async(values, id) => {
    const response = await axios.post(WALLET_URLS.FORGIVE_DEBT_QUOTA(id), values);
    return response.data
}

export const assignLostQuota = async(values, id) => {
    const response = await axios.post(WALLET_URLS.ASSIGN_LOST_QUOTA(id), values);
    return response.data
}
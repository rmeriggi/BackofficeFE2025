import axios from 'axios';

export const INVESTMENT_ACCOUNTS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/investment/accounts`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/investment/accounts/${id}`,
    GET_PEOPLE_BY_ACCOUNT: (id) => `${process.env.REACT_APP_API_URL}/investment/accounts/people/${id}`,
    GET_ACCOUNTS_BY_ACCOUNT: (id) => `${process.env.REACT_APP_API_URL}/investment/accounts/accounts/${id}`,
    GET_BANKS_BY_ACCOUNT: (id) => `${process.env.REACT_APP_API_URL}/investment/accounts/banks/${id}`,
}

export const get_all = async() => {
    const response = await axios.get(INVESTMENT_ACCOUNTS_URLS.GET_ALL)
    return response.data
}

export const getOne = async(id) => {
    const response = await axios.get(INVESTMENT_ACCOUNTS_URLS.GET_ONE(id));
    return response.data
}

export const getPeolpe = async(id) => {
    const response = await axios.get(INVESTMENT_ACCOUNTS_URLS.GET_PEOPLE_BY_ACCOUNT(id));
    return response.data
}

export const getAccounts = async(id) => {
    const response = await axios.get(INVESTMENT_ACCOUNTS_URLS.GET_ACCOUNTS_BY_ACCOUNT(id));
    return response.data
}

export const getBanks = async(id) => {
    const response = await axios.get(INVESTMENT_ACCOUNTS_URLS.GET_BANKS_BY_ACCOUNT(id));
    return response.data
}
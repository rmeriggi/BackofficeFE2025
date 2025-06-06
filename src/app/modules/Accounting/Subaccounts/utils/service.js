import axios from 'axios';

export const SUBACCOUNTS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/subAccounts`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/subAccount/${id}`,
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/editSubAccount/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/newSubAccount`
}

export const getAllSubaccounts = async(values) => {
    try {
        const response = await axios.post(SUBACCOUNTS_URLS.GET_ALL, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const getOneSubaccount = async(id) => {
    const response = await axios.get(SUBACCOUNTS_URLS.GET_ONE(id));
    return response.data
} 

export const edit = async(id, values) => {
    try {
        const response = await axios.post(SUBACCOUNTS_URLS.EDIT(id), values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const create = async(values) => {
    try {
        const response = await axios.post(SUBACCOUNTS_URLS.CREATE, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
} 
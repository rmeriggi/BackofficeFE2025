import axios from "axios";
 
export const ACCOUNTS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/accounting/accounts`,
    GET_ONE: (id)=> `${process.env.REACT_APP_API_URL}/accounting/account/${id}`,
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/accounting/editAccount/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/accounting/newAccount`
}

export const getAllAccounts = async(values) => {
    try {
        const response = await axios.post(ACCOUNTS_URLS.GET_ALL, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const getOne = async(id) => {
    const response = await axios.get(ACCOUNTS_URLS.GET_ONE(id))
    return response.data
}

export const edit = async(id, values) => {
    try {
        const response = await axios.post(ACCOUNTS_URLS.EDIT(id), values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const create = async(values) => {
    try {
        const response = await axios.post(ACCOUNTS_URLS.CREATE, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}
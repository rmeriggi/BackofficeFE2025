import axios from 'axios';

export const ACCOUNTING_GROUPS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/accountingGroups`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/accountingGroup/${id}`,
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/accountingGroup/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/accountingGroup`
}

export const getAllAccountingGroup = async(values) => {
    const response = await axios.post(ACCOUNTING_GROUPS_URLS.GET_ALL, values);
    return response.data
}

export const getOneAccoutingGroup = async(id) => {
    const response = await axios.get(ACCOUNTING_GROUPS_URLS.GET_ONE(id))
    return response.data;
}

export const edit = async(id, values) => {
    try {
        const response = await axios.post(ACCOUNTING_GROUPS_URLS.EDIT(id), values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const create = async(values) => {
    try {
        const response = await axios.post(ACCOUNTING_GROUPS_URLS.CREATE, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data);
    }
}
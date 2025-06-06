import axios from 'axios';

export const ACCOUNTING_ENTRIES_URLS = {
    GET_LIST: `${process.env.REACT_APP_API_URL}/accountingEntries`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/accountingEntry/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/newAccountingEntry`
}

export const getAccountingEntries = async(values) => {
    try {
        const response = await axios.post(ACCOUNTING_ENTRIES_URLS.GET_LIST, values)
        return response.data
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getOneEntryDetail = async(id) => {
    const response = await axios.get(ACCOUNTING_ENTRIES_URLS.GET_ONE(id));
    return response.data
}

export const create = async(values) => {
    const response = await axios.post(ACCOUNTING_ENTRIES_URLS.CREATE, values)
    return response.data
}
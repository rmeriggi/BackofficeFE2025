import axios from "axios";

export const COLLECTION_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cashoutTransactions`,
    REVERSE: (id) => `${process.env.REACT_APP_API_URL}/cashoutReverseTransactions/${id}`,
    CONSULT: (id) => `${process.env.REACT_APP_API_URL}/cashoutTransactions/${id}`
}

export const getCashoutTransactions = async(values) => {
    const response = await axios.get(COLLECTION_URLS.GET);
    return response.data;
}

export const reverse = async(id) => {
    try {
        const response = await axios.post(COLLECTION_URLS.REVERSE(id))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const getCashoutTransactionsConsult = async(id) => {
    try {
        const response = await axios.get(COLLECTION_URLS.CONSULT(id))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}
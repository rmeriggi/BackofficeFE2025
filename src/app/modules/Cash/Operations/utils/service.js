import axios from "axios";

export const COLLECTION_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cash/collections`,
    GET_OPERATIONS: `${process.env.REACT_APP_API_URL}/cash/operations`,
    AUTHORIZE_OPERATION: (id) => `${process.env.REACT_APP_API_URL}/cash/operations/authorize/${id}`,
    REJECT_OPERATION: (id) => `${process.env.REACT_APP_API_URL}/cash/operations/reject/${id}`,
}

export const getListCollection = async(values) => {
    const response = await axios.post(COLLECTION_URLS.GET, values);
    return response.data;
}

export const getOperations = async() => {
    const response = await axios.get(COLLECTION_URLS.GET_OPERATIONS);
    return response.data;
}

export const authorize = async(id) => {
    try {
        const response = await axios.post(COLLECTION_URLS.AUTHORIZE_OPERATION(id))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const reject = async(id) => {
    try {
        const response = await axios.post(COLLECTION_URLS.REJECT_OPERATION(id))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}
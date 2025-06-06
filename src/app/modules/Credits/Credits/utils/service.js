import axios from "axios";
 
export const CREDITS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/credits`,
    GET_ALL_LIST: `${process.env.REACT_APP_API_URL}/creditsList`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/credits/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/credit`,
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/credit/${id}`,
    GET_COMBO_STATUS_CREDITS: `${process.env.REACT_APP_API_URL}/statusCredits`,
    CHANGE_STATUS: `${process.env.REACT_APP_API_URL}/credits/update-status`
}

export const getAll = async(values) => {
    try {
        const response = await axios.post(CREDITS_URLS.GET_ALL, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getAllCreditsList = async(values) => {
    try {
        const response = await axios.post(CREDITS_URLS.GET_ALL_LIST, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const get = async (id) => {
    try {
        const response = await axios.get(CREDITS_URLS.GET_ONE(id));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const create = async (credit) => {
    try {
        const response = await axios.post(CREDITS_URLS.CREATE, credit);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const edit = async (id, credit) => {
    try {
        const response = await axios.get(CREDITS_URLS.EDIT(id), credit);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getStatusCredits = async () => {
    try {
        const response = await axios.get(CREDITS_URLS.GET_COMBO_STATUS_CREDITS);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const changeStatusCredit = async (values) => {
    try {
        const response = await axios.post(CREDITS_URLS.CHANGE_STATUS, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
import axios from "axios";
 
export const CREDITS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/credits`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/credit/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/credit`,
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/credit/${id}`,
    GET_ALL_COUNTRIES: `${process.env.REACT_APP_API_URL}/countries`,
    GET_ALL_ENTITIES: `${process.env.REACT_APP_API_URL}/entities`,
    GET_ALL_CURRENCIES: `${process.env.REACT_APP_API_URL}/currencies`,
}

export const getAll = async() => {
    try {
        const response = await axios.get(CREDITS_URLS.GET_ALL);
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

export const getAllCountries = async() => {
    try {
        const response = await axios.get(CREDITS_URLS.GET_ALL_COUNTRIES);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getAllEntities = async() => {
    try {
        const response = await axios.get(CREDITS_URLS.GET_ALL_ENTITIES);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getAllCurrencies = async() => {
    try {
        const response = await axios.get(CREDITS_URLS.GET_ALL_CURRENCIES);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
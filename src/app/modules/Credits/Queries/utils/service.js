import axios from "axios";
 
export const collections_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/credits/queryAsign`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/collection/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/collection`,
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/collection/${id}`,
    GET_ALL_COUNTRIES: `${process.env.REACT_APP_API_URL}/countries`,
    GET_ALL_ENTITIES: `${process.env.REACT_APP_API_URL}/entities`,
    GET_ALL_CURRENCIES: `${process.env.REACT_APP_API_URL}/currencies`,
    GET_IVR: (id) => `${process.env.REACT_APP_API_URL}/queryAsignURL/${id}`,
}

export const getAll = async(values) => {
    try {
        const response = await axios.post(collections_URLS.GET_ALL, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const get = async (id) => {
    try {
        const response = await axios.get(collections_URLS.GET_ONE(id));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const create = async (collection) => {
    try {
        const response = await axios.post(collections_URLS.CREATE, collection);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const edit = async (id, collection) => {
    try {
        const response = await axios.get(collections_URLS.EDIT(id), collection);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getAllCountries = async() => {
    try {
        const response = await axios.get(collections_URLS.GET_ALL_COUNTRIES);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getAllEntities = async() => {
    try {
        const response = await axios.get(collections_URLS.GET_ALL_ENTITIES);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getAllCurrencies = async() => {
    try {
        const response = await axios.get(collections_URLS.GET_ALL_CURRENCIES);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getIvrData = async(id) => {
    try {
        const response = await axios.get(collections_URLS.GET_IVR(id));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
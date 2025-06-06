import axios from "axios";

export const MANAGEMENT_USERS_URLS = {
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/users/${id}`,
    EDIT_ONE: (id) => `${process.env.REACT_APP_API_URL}/users/${id}`,
    CREATE_ONE_USER: `${process.env.REACT_APP_API_URL}/users`,
    GET_ACCESS: (id) => `${process.env.REACT_APP_API_URL}/users/${id}/permissions`,
    CREATE_ACCESS: (id) => `${process.env.REACT_APP_API_URL}/users/${id}/permissions`,
    DELETE_ACCESS: (idUser, idModule) => `${process.env.REACT_APP_API_URL}/users/${idUser}/permissions/${idModule}`,
    GET_MODULES: `${process.env.REACT_APP_API_URL}/modules`,
}

export const getOneUser = async(id) => {
    const response = await axios.get(MANAGEMENT_USERS_URLS.GET_ONE(id));
    return response.data;
}

export const editOneUser = async(id, values) => {
    const response = await axios.post(MANAGEMENT_USERS_URLS.EDIT_ONE(id), values);
    return response.data;
}

export const createOneUser = async(values) => {
    const response = await axios.post(MANAGEMENT_USERS_URLS.CREATE_ONE_USER, values);
    return response.data;
}

export const getAllAccess = async(id) => {
    const response = await axios.get(MANAGEMENT_USERS_URLS.GET_ACCESS(id));
    return response.data;
}

export const createAccess = async(id, values) => {
    const response = await axios.post(MANAGEMENT_USERS_URLS.CREATE_ACCESS(id), values);
    return response.data;
}

export const deleteAccess = async(idUser, idModule) => {
    const response = await axios.delete(MANAGEMENT_USERS_URLS.DELETE_ACCESS(idUser, idModule));
    return response.data;
}

export const getModules = async() => {
    const response = await axios.get(MANAGEMENT_USERS_URLS.GET_MODULES);
    return response.data;
}
import axios from "axios";

export const MOVEMENTS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/external/movements`,
    GET_STATUS_LIST: `${process.env.REACT_APP_API_URL}/external/movementStatusList`,
    GET_ONE_MOVEMENT: (id) => `${process.env.REACT_APP_API_URL}/external/movements/${id}`,
    UPDATE_MOVEMENT: (id) => `${process.env.REACT_APP_API_URL}/external/movements/${id}`
}

export const getListMovements = async() => {
    const response = await axios.get(MOVEMENTS_URLS.GET);
    return response.data;
}

export const getListStatus = async() => {
    const response = await axios.get(MOVEMENTS_URLS.GET_STATUS_LIST);
    return response.data;
}

export const getOneMovement = async(id) => {
    const response = await axios.get(MOVEMENTS_URLS.GET_ONE_MOVEMENT(id));
    return response.data;
}

export const edit = async(id, values) => {
    const response = await axios.put(MOVEMENTS_URLS.UPDATE_MOVEMENT(id), values);
    return response.data
}
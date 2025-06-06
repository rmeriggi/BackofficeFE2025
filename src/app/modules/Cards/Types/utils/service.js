import axios from "axios";

export const TYPES_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cards/types`,
}

export const getListTypes = async() => {
    const response = await axios.get(TYPES_URLS.GET);
    return response.data;
}
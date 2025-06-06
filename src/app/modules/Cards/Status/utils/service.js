import axios from "axios";

export const STATUS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cards/status`,
}

export const getListStatus = async() => {
    const response = await axios.get(STATUS_URLS.GET);
    return response.data;
}
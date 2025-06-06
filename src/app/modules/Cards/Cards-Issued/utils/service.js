import axios from "axios";

export const CARDS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cards`,
}

export const getListCards = async() => {
    const response = await axios.get(CARDS_URLS.GET);
    return response.data;
}
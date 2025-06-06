import axios from "axios";

export const BRANDS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cards/brands`,
}

export const getListBrands = async() => {
    const response = await axios.get(BRANDS_URLS.GET);
    return response.data;
}
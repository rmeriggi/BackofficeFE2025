import axios from "axios";

export const COLLECTION_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/cash/collections`
}

export const getListCollection = async(values) => {
    const response = await axios.post(COLLECTION_URLS.GET, values);
    return response.data;
}
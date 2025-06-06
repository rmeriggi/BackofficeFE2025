import axios from 'axios';

export const PRODUCTS_URLS = {
    GET_ALL_PRODUCTS: `${process.env.REACT_APP_API_URL}/cards/providers`,
}

export const getAllProviders = async() => {
    const response = await axios.get(PRODUCTS_URLS.GET_ALL_PRODUCTS);
    return response.data; 
}
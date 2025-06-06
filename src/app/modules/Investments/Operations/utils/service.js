import axios from "axios";
 
export const PRODUCTS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/products`,
}


export const getAll = async(values) => {
    try {
        const response = await axios.post(PRODUCTS_URLS.GET_ALL, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
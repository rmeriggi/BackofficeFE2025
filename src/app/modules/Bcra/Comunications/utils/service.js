import axios from "axios";
 

export const COMUNICATIONS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/BCRA/comunications`,
    EDIT_COMUNICATION: (id) => `${process.env.REACT_APP_API_URL}/BCRA/comunications/${id}`,
}

export const getAllComunications = async() => {
    const response = await axios.get(COMUNICATIONS_URLS.GET);
    return response.data;
}

export const editComunication = async(id) => {
    const response = await axios.post(COMUNICATIONS_URLS.EDIT_COMUNICATION(id));
    return response.data;
}
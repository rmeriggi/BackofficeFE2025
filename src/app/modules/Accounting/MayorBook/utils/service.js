import axios from 'axios';

export const MAYORBOOK_URLS = {
    GET_LIST: `${process.env.REACT_APP_API_URL}/accounting/mayorBook`,
}

export const getListMayorBook = async(values) => {
    try {
        const response = await axios.post(MAYORBOOK_URLS.GET_LIST, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
} 
import axios from 'axios';

export const DIARYBOOK_URLS = {
    GET_LIST: `${process.env.REACT_APP_API_URL}/accounting/diaryBook`,
}

export const getListDiaryBook = async(values) => {
    try {
        const response = await axios.post(DIARYBOOK_URLS.GET_LIST, values);
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
} 
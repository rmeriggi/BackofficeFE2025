import axios from 'axios';

export const AUX_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/auxiliariesAccounts`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/auxiliaryAccount/${id}`,
    EDIT: (id) => `${process.env.REACT_APP_API_URL}/auxiliaryAccount/${id}`,
    CREATE: `${process.env.REACT_APP_API_URL}/auxiliaryAccount`,
    DIARY_BOOK_VISTA: `${process.env.REACT_APP_API_URL}/accounting/diaryBook/vista`,
    DIARY_BOOK_PDF: `${process.env.REACT_APP_API_URL}/accounting/diaryBook/reportPdf` 
}

export const getAllAuxAccounts = async(values) => {
    try {
        const response = await axios.post(AUX_URLS.GET_ALL, values);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const getOneAuxAccount = async(id) => {
    const response = await axios.get(AUX_URLS.GET_ONE(id));
    return response.data;
}

export const edit = async(id, values) => {
    try {
        const response = await axios.post(AUX_URLS.EDIT(id), values);
        return response;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const create = async(values) => {
    try {
        const response = await axios.post(AUX_URLS.CREATE, values);
        return response;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getDiaryBookVista = async(values) => {
    try {
        const response = await axios.post(AUX_URLS.DIARY_BOOK_VISTA, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getDiaryBookPdf = async(values) => {
    try {
        console.log('Sending PDF request with values:', values); 
        const response = await axios.post(AUX_URLS.DIARY_BOOK_PDF, values, {
            headers: {
                "Content-Type": "application/json",
            },
            responseType: "blob",
        });
        console.log('Received PDF response:', response); 
        return response;
    } catch (error) {
        console.error('Error in getDiaryBookPdf:', error); 
        throw new Error(error.response.data);
    }
}
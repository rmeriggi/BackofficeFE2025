import axios from 'axios';

export const DOCUMENTS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/documents`,
    GET_ALL_DOCUMENT_STATUS: `${process.env.REACT_APP_API_URL}/documents/status`,
    EDIT_STATUS: (id) => `${process.env.REACT_APP_API_URL}/documents/status/${id}`,
}

export const getAllDocuments = async() => {
    const response = await axios.get(DOCUMENTS_URLS.GET_ALL);
    return response.data;
}

export const getAllDocumentsStatus = async() => {
    const response = await axios.get(DOCUMENTS_URLS.GET_ALL_DOCUMENT_STATUS);
    return response.data;
}

export const editStatus = async(id, values) => {
    try {
        const response = await axios.post(DOCUMENTS_URLS.EDIT_STATUS(id), values);
        return response.data
    } catch (error) {
        throw new Error(error.response.message)
    }
}
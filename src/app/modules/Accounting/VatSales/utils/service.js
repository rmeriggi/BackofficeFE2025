import axios from 'axios';

export const VATSALES_URLS = {
    GET_LIST: `${process.env.REACT_APP_API_URL}/accounting/IVA_ventas/vista`,
    GET_REPORT: `${process.env.REACT_APP_API_URL}/accounting/IVA_ventas/reportPdf`
};

export const getVatSalesList = async (values) => {
    try {
        const response = await axios.post(VATSALES_URLS.GET_LIST, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const getVatSalesPdf = async (values) => {
    try {
        const response = await axios.post(VATSALES_URLS.GET_REPORT, values, { responseType: 'blob' });
        return response;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

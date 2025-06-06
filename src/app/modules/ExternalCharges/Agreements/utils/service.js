import axios from "axios";

export const ITAU_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/external/paymentLinks`,
}

export const getPaymentLinks = async() => {
    const response = await axios.get(ITAU_URLS.GET);
    return response.data;
}
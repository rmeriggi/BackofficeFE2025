import axios from "axios";

export const ITAU_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/external/paymentLinksDistributors`,
}

export const getDistributors = async(values) => {
    const response = await axios.get(ITAU_URLS.GET, values);
    return response.data;
}
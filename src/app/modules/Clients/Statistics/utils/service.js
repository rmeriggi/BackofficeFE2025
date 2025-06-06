import axios from "axios";
 

export const DASHBOARD_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/dashboard`
}

export const getClientStatistics = async(values) => {
    const response = await axios.post(DASHBOARD_URLS.GET, values);
    return response.data;
}

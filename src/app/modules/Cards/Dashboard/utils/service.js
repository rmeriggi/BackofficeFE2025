import axios from "axios";
 

export const DASHBOARD_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/dashboard`
}

export const get = async() => {
    const response = await axios.get(DASHBOARD_URLS.GET);
    return response.data;
}

import axios from "axios";
 
export const REPORTS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/BCRA/reports`,
}

export const getAllReports = async() => {
    const response = await axios.get(REPORTS_URLS.GET);
    return response.data;
}

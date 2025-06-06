import axios from "axios";
 
export const SECTIONB_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/BCRA/sectionB`,
}

export const getSectionB = async(values) => {
    const response = await axios.post(SECTIONB_URLS.GET, values);
    return response.data;
}

import axios from "axios";
 
export const SECTIONA_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/BCRA/sectionA`,
}

export const getSectionA = async(values) => {
    const response = await axios.post(SECTIONA_URLS.GET, values);
    return response.data;
}

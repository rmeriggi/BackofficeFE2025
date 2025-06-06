import axios from "axios";
 
export const ARCHIVES_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/BCRA/files`,
}

export const getAllArchives = async() => {
    const response = await axios.get(ARCHIVES_URLS.GET);
    return response.data;
}

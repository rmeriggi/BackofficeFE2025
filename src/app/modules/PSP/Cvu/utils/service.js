import axios from "axios";
 
export const CVU_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/uploadCVU`,
}

export const getAllCvu = async(values) => {
    const response = await axios.post(CVU_URLS.GET, values);
    return response.data;
}


import axios from "axios";
import { loadAbort } from "../../../../utils/loadAbort";

export const SITES_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/external/sites`,
    EDIT_SITE: `${process.env.REACT_APP_API_URL}/external/sites/edit`,
    GET_SITE: (id) =>`${process.env.REACT_APP_API_URL}/external/sites/get/${id}`,
    CREATE_SITE:`${process.env.REACT_APP_API_URL}/external/sites/create`,
}

export const getListSites = () => {
    const controller = loadAbort();
    return { call: axios.get(SITES_URLS.GET, { signal: controller.signal }), controller }
}

export const editIdSite = async(values) => {
    const response = await axios.post(SITES_URLS.EDIT_SITE, values);
    return response.data;
}

export const getIdSite = async(id) => {
    const response = await axios.get(SITES_URLS.GET_SITE(id));
    return response.data;
}

export const createIdSite = async(values) => {
    const response = await axios.post(SITES_URLS.CREATE_SITE, values);
    return response.data;
}
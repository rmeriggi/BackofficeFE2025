import axios from "axios";
 
export const ADJUST_URLS = {
    AFIP: `${process.env.REACT_APP_API_URL}/Afip8126v2`,
    EXENTO: `${process.env.REACT_APP_API_URL}/AFIP_F778ExentoV2`,
    GRABADO: `${process.env.REACT_APP_API_URL}/AFIP_F776GrabadoV2`,

}

export const seatAfip = async(values) => {
    const response = await axios.post(ADJUST_URLS.AFIP, values);
    return response.data;
}


export const seatExento = async(values) => {
    const response = await axios.post(ADJUST_URLS.EXENTO, values);
    return response.data;
}


export const seatGrabado = async(values) => {
    const response = await axios.post(ADJUST_URLS. GRABADO, values);
    return response.data;
}


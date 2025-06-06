import axios from "axios";

export const ITAU_URLS = {
    GET: (dates) => `${process.env.REACT_APP_API_URL}/cash/itau?fromDate=${dates.fromDate}&toDate=${dates.toDate}`,
}

export const getListMovements = async(dates) => {
    const response = await axios.get(ITAU_URLS.GET(dates));
    return response.data;
}
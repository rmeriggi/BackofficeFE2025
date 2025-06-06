import axios from "axios";
 
export const ADJUST_URLS = {
    ADJUST: `${process.env.REACT_APP_API_URL}/settings`,
    CREDIT_SEAT: `${process.env.REACT_APP_API_URL}/accountingCreaditSeatting`,
    DEBIT_SEAT: `${process.env.REACT_APP_API_URL}/accountingDebitSeattings`,
    CASH_IN_DIRECTO: `${process.env.REACT_APP_API_URL}/cashInDirectoSettings`,
    CASH_OUT_DIRECTO: `${process.env.REACT_APP_API_URL}/cashOutDirectoSettings`,
}

export const createAdjust = async(values) => {
    const response = await axios.post(ADJUST_URLS.ADJUST, values);
    return response.data;
}


export const seatCredit = async(values) => {
    const response = await axios.post(ADJUST_URLS.CREDIT_SEAT, values);
    return response.data;
}


export const seatDebit = async(values) => {
    const response = await axios.post(ADJUST_URLS.DEBIT_SEAT, values);
    return response.data;
}

export const cashInDirecto = async(values) => {
    const response = await axios.post(ADJUST_URLS.CASH_IN_DIRECTO, values);
    return response.data;
}

export const cashOutDirecto = async(values) => {
    const response = await axios.post(ADJUST_URLS.CASH_OUT_DIRECTO, values);
    return response.data;
}
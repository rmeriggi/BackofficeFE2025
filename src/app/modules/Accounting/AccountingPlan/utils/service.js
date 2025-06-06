import axios from "axios";
 
export const ACCOUNTING_PLANS_URLS = {
    GET_ALL: `${process.env.REACT_APP_API_URL}/accountingPlan`,
}

export const getAll = async(values) => {
    try {
        const response = await axios.post(ACCOUNTING_PLANS_URLS.GET_ALL, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
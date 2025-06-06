import axios from "axios";
 
export const COLLECTIONS_URLS = {
    GET_ALL:(id)=> `${process.env.REACT_APP_API_URL}/collectionManagment/${id}`,
    GET_ONE: (id) => `${process.env.REACT_APP_API_URL}/collection/${id}`,
    GET_QUOTAS_LIST: (id) => `${process.env.REACT_APP_API_URL}/credits/${id}/quotas`,
    GET_CONTACTS_TYPES: `${process.env.REACT_APP_API_URL}/contactsTypes`,
    GET_ONE_CREDIT: (id) => `${process.env.REACT_APP_API_URL}/credits/${id}`,
    PAYMENT_LINK: `${process.env.REACT_APP_API_URL}/credits/paymentLink`,
    NEW_CONTACT: `${process.env.REACT_APP_API_URL}/credits/newContact`,
    ACTIVITY_REGISTER: (id) => `${process.env.REACT_APP_API_URL}/client/${id}/activityRegister`,
    DETAIL_ACTIVITY_REGISTER: (id) => `${process.env.REACT_APP_API_URL}/activityRegister/${id}`,
    DETAIL_COLLECTION: (id, idQuota) => `${process.env.REACT_APP_API_URL}/oneCredit/${id}/collection/${idQuota}`,
    MANAGMENT_STATUS: (id) => `${process.env.REACT_APP_API_URL}/managementStatus/${id}`,
    PAYMENT_PLAN: `${process.env.REACT_APP_API_URL}/credits/paymentPlan`,
    FORCE_DOCUMENT: `${process.env.REACT_APP_API_URL}/force/document`,
    CALCULATE_PLAN: `${process.env.REACT_APP_API_URL}/credits/calculatePlan`,
    SEND_PLAN: `${process.env.REACT_APP_API_URL}/credits/sendPlan`,
    GET_CHANNELS: `${process.env.REACT_APP_API_URL}/collectionsChannels`,

}

export const getAll = async(id) => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.GET_ALL(id));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}


export const getAllChannels = async() => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.GET_CHANNELS);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const get = async (id) => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.GET_ONE(id));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getQuotasList = async (id) => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.GET_QUOTAS_LIST(id));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getContactsTypes = async () => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.GET_CONTACTS_TYPES);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const getOneCredit = async (id) => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.GET_ONE_CREDIT(id));
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const newPaymentLink = async (values) => {
    try {
        const response = await axios.post(COLLECTIONS_URLS.PAYMENT_LINK, values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const postNewContact = async(values) => {
    try {
        const response = await axios.post(COLLECTIONS_URLS.NEW_CONTACT, values)
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const getActivitiesRegister = async(id) => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.ACTIVITY_REGISTER(id))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const getDetailActivitiesRegister = async(id) => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.DETAIL_ACTIVITY_REGISTER(id))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const getDetailCollection = async(id, idQuota)=> {
    try {
        const response = await axios.get(COLLECTIONS_URLS.DETAIL_COLLECTION(id, idQuota))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const getManagmentStatus = async(id) => {
    try {
        const response = await axios.get(COLLECTIONS_URLS.MANAGMENT_STATUS(id))
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const callPaymentPlan = async(idCredit) => {
    try {
        const response = await axios.post(COLLECTIONS_URLS.PAYMENT_PLAN, {idCredit})
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const forceDocument = async(dni) => {
    try {
        const response = await axios.post(COLLECTIONS_URLS.FORCE_DOCUMENT, dni)
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const calculatePlan = async(values) => {
    try {
        const response = await axios.post(COLLECTIONS_URLS.CALCULATE_PLAN, values)
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

export const sendPlan = async(values) => {
    try {
        const response = await axios.post(COLLECTIONS_URLS.SEND_PLAN, values)
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}
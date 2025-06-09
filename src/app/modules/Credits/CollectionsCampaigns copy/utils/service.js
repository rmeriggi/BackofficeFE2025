import axios from 'axios';

const CAMPAIGNS_URLS = {
    CAMPAIGN: `${process.env.REACT_APP_API_URL}/credits/campaigns`,
}

export const campaign = async (values) => {
    try {
        const response = axios.post(CAMPAIGNS_URLS.CAMPAIGN, values)
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}
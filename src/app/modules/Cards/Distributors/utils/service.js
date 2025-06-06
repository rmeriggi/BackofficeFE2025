import axios from 'axios';

export const DISTRIBUTORS_URLS = {
    GET_ALL_DISTRIBUTORS: `${process.env.REACT_APP_API_URL}/cards/distributors`,
}

export const getAllDistributors = async() => {
    const response = await axios.get(DISTRIBUTORS_URLS.GET_ALL_DISTRIBUTORS);
    return response.data; 
}
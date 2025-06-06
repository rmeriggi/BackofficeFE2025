import axios from "axios";
 
export const ROS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/BCRA/ROS`,
}

export const getAllRos = async() => {
    const response = await axios.get(ROS_URLS.GET);
    return response.data;
}


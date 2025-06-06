import axios from "axios";
 
export const SCOREPARAMS_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/scoreParams`,
}

export const getScoreParams = async() => {
  const response = await axios.get(SCOREPARAMS_URLS.GET);
  return response.data;
}
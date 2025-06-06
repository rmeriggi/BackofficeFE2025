import axios from "axios";
 
export const SCORESOURCE_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/scoreSource`,
}

export const getScoreSource = async() => {
  const response = await axios.get(SCORESOURCE_URLS.GET);
  return response.data;
}
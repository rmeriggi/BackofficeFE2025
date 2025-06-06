import axios from "axios";

export const CLIENTS_URLS = {
  GET_CLIENTS:(search) => `${process.env.REACT_APP_API_URL}/clientsList?search=${search}`,
}

// GET Clients
export const getClients = async(search) => {
  const response = await axios.get(CLIENTS_URLS.GET_CLIENTS(search));
  return  response.data
}
import axios from "axios";

export const SIGNATURES_URLS = {
  SIGANTURES_CLIENTS:() => `${process.env.REACT_APP_API_URL}/client/resum`,
  GET_SIGNATURES:() => `${process.env.REACT_APP_API_URL}/client/signtureSchemes`,
  POST_SIGNATURE_BYCLIENTID:() => `${process.env.REACT_APP_API_URL}/client/signtureScheme/byClientId`,
  GET_SIGNATURE_BYID:(id) => `${process.env.REACT_APP_API_URL}/client/signtureScheme/${id}`,
  NEW_SIGNATURE:() => `${process.env.REACT_APP_API_URL}/client/signtureScheme/new`,
  UPDATE_SIGNATURE:() => `${process.env.REACT_APP_API_URL}/client/signtureScheme/update`,
  DISABLE_SIGNATURE:(id) => `${process.env.REACT_APP_API_URL}/client/disable/${id}`,
}

// GET Clients Resum
export const getClientsResum = async(search) => {
  const response = await axios.post(SIGNATURES_URLS.SIGANTURES_CLIENTS(), {search: search});
  return  response.data
}

// GET Clients
export const getSignatures = async() => {
  const response = await axios.get(SIGNATURES_URLS.GET_SIGNATURES());
  return  response.data
}

export const getSignaturesByClientId = async(idClient) => {
  const values ={
    idClient:Number(idClient)
  }
  const response = await axios.post(SIGNATURES_URLS.POST_SIGNATURE_BYCLIENTID(), values);
  return  response.data
}

export const getSignaturesById = async(id) => {
  const response = await axios.post(SIGNATURES_URLS.GET_SIGNATURE_BYID(id));
  return  response.data
}


export const newSignature = async(values) => {
  const response = await axios.post(SIGNATURES_URLS.NEW_SIGNATURE(), values);
  return response.data;
}

export const updateSignature = async(values) => {
  const response = await axios.post(SIGNATURES_URLS.UPDATE_SIGNATURE(), values);
  return response.data;
}

export const disableSignature = async(id) => {
  const response = await axios.get(SIGNATURES_URLS.DISABLE_SIGNATURE(id));
  return  response.data
}










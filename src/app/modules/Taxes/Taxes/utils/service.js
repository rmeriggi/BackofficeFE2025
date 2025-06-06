import axios from "axios";

export const TAXES_URLS = {
    GET: `${process.env.REACT_APP_API_URL}/taxes`,
    CREATE_TAX: `${process.env.REACT_APP_API_URL}/taxes`,
    GET_ONE_TAX: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}`,
    EDIT_TAX: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}`,
    GET_EXCEPTIONS: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/exceptions`,
    NEW_EXCEPTION: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/exceptions`,
    DELETE_EXCEPTION: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/exceptions`,
    GET_TAXCLIENTLIST: (search) => `${process.env.REACT_APP_API_URL}/taxes/taxclientlist?search=${search}`,
    GET_TAXWHERE: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/where`,
    NEW_TAXWHERE: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/where`,
    DELETE_TAXWHERE: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/where`,
    GET_TAXWHO: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/who`,
    NEW_TAXWHO: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/who`,
    DELETE_TAXWHO: (id) => `${process.env.REACT_APP_API_URL}/taxes/${id}/who`,
    GET_TAXWHO_CLIENTS:`${process.env.REACT_APP_API_URL}/who/clients`,
    GET_EXCEPTIONS_CLIENTS:`${process.env.REACT_APP_API_URL}/exceptions/clients`,
    GET_ORIGIN_DESTINY:`${process.env.REACT_APP_API_URL}/originDestiny`,
}

export const getAllTaxes = async() => {
    const response = await axios.get(TAXES_URLS.GET);
    return response.data;
}

export const createNewTax = async(newTax) => {
  const response = await axios.post(TAXES_URLS.CREATE_TAX, newTax);
  return response.data;
}

export const getOneTax = async(id) => {
  const response = await axios.get(TAXES_URLS.GET_ONE_TAX(id));
  return response.data;
}

export const editTax = async(id, taxEdited) => {
  const response = await axios.post(TAXES_URLS.EDIT_TAX(id), taxEdited);
  return response.data;
}

export const getExceptions = async (id) => {
    const response = await axios.get(TAXES_URLS.GET_EXCEPTIONS(id));
    return response.data;
}

export const newException = async (id, values) => {
  const response = await axios.post(TAXES_URLS.NEW_EXCEPTION(id), values);
  return response.data;
}

export const deleteException = async (id) => {
  const response = await axios.delete(TAXES_URLS.DELETE_EXCEPTION(id));
  return response.data;
}

export const getTaxClientList = async (search) => {
  const response = await axios.get(TAXES_URLS.GET_TAXCLIENTLIST(search));
  return response.data;
}

export const getWhere = async (id) => {
  const response = await axios.get(TAXES_URLS.GET_TAXWHERE(id));
  return response.data;
}

export const newTaxWhere = async (id, values) => {
  const response = await axios.post(TAXES_URLS.NEW_TAXWHERE(id), values);
  return response.data;
}

export const deleteTaxWhere = async (id) => {
  const response = await axios.delete(TAXES_URLS.DELETE_TAXWHERE(id));
  return response.data;
}

export const getWho = async (id) => {
  const response = await axios.get(TAXES_URLS.GET_TAXWHO(id));
  return response.data;
}

export const newTaxWho = async (id, values) => {
  const response = await axios.post(TAXES_URLS.NEW_TAXWHO(id), values);
  return response.data;
}

export const deleteTaxWho = async (id, ) => {
  const response = await axios.post(TAXES_URLS.DELETE_TAXWHO(id));
  return response.data;
}

export const getTaxWhoClient = async () => {
  const response = await axios.get(TAXES_URLS.GET_TAXWHO_CLIENTS);
  return response.data;
}

export const getTaxExceptionClient = async () => {
  const response = await axios.get(TAXES_URLS.GET_EXCEPTIONS_CLIENTS);
  return response.data;
}

export const getOriginDestiny = async () => {
  const response = await axios.get(TAXES_URLS.GET_ORIGIN_DESTINY);
  return response.data;
}

import axios from "axios";

export const INVOICES_URLS = {
  POST_INVOICES: () => `${process.env.REACT_APP_API_URL}/debtsReceivable?page=1&pageSize=30`,
  GET_INVOICES_BY_ID: (id) => `${process.env.REACT_APP_API_URL}/debtsReceivable/by/${id}`,
  EDIT_INVOICE: () => `${process.env.REACT_APP_API_URL}/debtsReceivable/edit`,
  CREATE_INVOICE: () => `${process.env.REACT_APP_API_URL}/debtsReceivable/new`,
  DELETE_INVOICE: () => `${process.env.REACT_APP_API_URL}/debtsReceivable/delete`,
};

export const getInvoices = async () => {
  const response = await axios.post(INVOICES_URLS.POST_INVOICES());
  return response.data.data;
};

export const getInvoicesById = async (id) => {
  const response = await axios.get(INVOICES_URLS.GET_INVOICES_BY_ID(id));
  return response.data;
};

export const editInvoice = async (data) => {
  const response = await axios.post(INVOICES_URLS.EDIT_INVOICE(), data);
  return response.data;
};

export const createInvoice = async (data) => { 
  const response = await axios.post(INVOICES_URLS.CREATE_INVOICE(), data);
  return response.data;
};

export const deleteInvoice = async (id) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/debtsReceivable/delete`, { id });

};

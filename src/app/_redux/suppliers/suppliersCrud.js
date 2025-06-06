import axios from "axios";

export const SUPPLIERS_URLS = {
  GET_SUPPLIERS: () => `${process.env.REACT_APP_API_URL}/supplier/all`,
  GET_SUPPLIERS_DETAIL: (id) => `${process.env.REACT_APP_API_URL}/supplier/detail/${id}`,
  POST_SUPPLIER_NEW: () => `${process.env.REACT_APP_API_URL}/supplier/new`,
  UPDATE_SUPPLIER: () => `${process.env.REACT_APP_API_URL}/supplier/update`,
  SUPPLIER_DELETE: () => `${process.env.REACT_APP_API_URL}/supplier/delete`,
  GET_BANK_ACCOUNTS: (id) => `${process.env.REACT_APP_API_URL}/supplier/bankAccount/all/${id}`,
  ADD_BANK_ACCOUNT: () => `${process.env.REACT_APP_API_URL}/supplier/bankAccount/new`,
  DELETE_BANK_ACCOUNT: () => `${process.env.REACT_APP_API_URL}/supplier/bankAccount/delete`,
};

export const getSuppliers = async () => {
  const response = await axios.get(SUPPLIERS_URLS.GET_SUPPLIERS());
  return response.data;
};

export const getSupplierDetail = async (id) => {
  const response = await axios.get(SUPPLIERS_URLS.GET_SUPPLIERS_DETAIL(id));
  return response.data;
};

export const updateSupplier = async (supplierData) => {
  const response = await axios.post(SUPPLIERS_URLS.UPDATE_SUPPLIER(), supplierData);
  return response.data;
};

export const createSupplier = async (supplierData) => {
  const response = await axios.post(SUPPLIERS_URLS.POST_SUPPLIER_NEW(), supplierData);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await axios.post(SUPPLIERS_URLS.SUPPLIER_DELETE(), { id });
  return response.data;
};

export const getBankAccounts = async (id) => {
  try {
    const response = await axios.get(SUPPLIERS_URLS.GET_BANK_ACCOUNTS(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching bank accounts:', error.message || error);
    throw error;
  }
};

export const addBankAccount = async (bankAccountData) => {
  const response = await axios.post(SUPPLIERS_URLS.ADD_BANK_ACCOUNT(), bankAccountData);
  return response.data;
};

export const deleteBankAccount = async (accountId) => {
  const response = await axios.delete(`${SUPPLIERS_URLS.DELETE_BANK_ACCOUNT()}/${accountId}`);
  return response.data;
};

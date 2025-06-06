import axios from "axios";

export const BANK_ACCOUNTS_URLS = {
  GET_BANK_ACCOUNTS:(idClient) => `${process.env.REACT_APP_API_URL}/bankAccounts/get-all-accounts/${idClient}`,
  GET_BANK_ACCOUNT_BY_ID:(idAccount) => `${process.env.REACT_APP_API_URL}/bankAccounts/getById-account/${idAccount}`,
  EDIT_BANK_ACCOUNT:() => `${process.env.REACT_APP_API_URL}/bankAccounts/update-account`,
  DELETE_BANK_ACCOUNT_BY_ID:(idAccount) => `${process.env.REACT_APP_API_URL}/bankAccounts/delete-account/${idAccount}`,
  CREATE_BANK_ACCOUNT:() => `${process.env.REACT_APP_API_URL}/bankAccounts/new-account`,
}

// GET Bank Accounts
export const getBankAccounts = async(idClient) => {
  const response = await axios.get(BANK_ACCOUNTS_URLS.GET_BANK_ACCOUNTS(idClient));
  return  response.data
}

export const getBankAccountById = async(idAccount) => {
  const response = await axios.get(BANK_ACCOUNTS_URLS.GET_BANK_ACCOUNT_BY_ID(idAccount));
  return  response.data
}

export const editBankAccountById = async(accountData) => {

  const bankAccount =  {
      id:accountData.id,
      cuit: accountData.cuit,
      CBU: accountData.CBU,
      CBUAlias: accountData.CBUAlias,
      idClient:accountData.idClient,
      entity:accountData.entity                                                                                   
  }
  const response = await axios.post(BANK_ACCOUNTS_URLS.EDIT_BANK_ACCOUNT(), bankAccount);
  return  response.data
}

export const deleteBankAccount = async (idAccount) => {
  const response = await axios.delete(BANK_ACCOUNTS_URLS.DELETE_BANK_ACCOUNT_BY_ID(idAccount));
  return response.data;
};
export const createBankAccount = async(accountData) => {

  const bankAccount =  {
      cuit: accountData.cuit,
      CBU: accountData.CBU,
      CBUAlias: accountData.CBUAlias,
      idClient:accountData.idClient,
      entity:accountData.entity                                                                                     
  }
  const response = await axios.post(BANK_ACCOUNTS_URLS.CREATE_BANK_ACCOUNT(), bankAccount);
  return  response.data
}

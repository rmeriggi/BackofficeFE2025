import * as requestFromServer from "./bankAccountsCrud";
import {bankAccountsSlice} from "./bankAccountsSlice";
import { getOne } from "../../modules/Clients/Clients/utils/service";

const {actions} = bankAccountsSlice;

export const getAllBankAccounts = (idClient , showSplash) => dispatch => {

  const mock = [{
    idProveedor: "",
    idClient: "",
    CBU: "",
    CBUAlias: "",
    cuit: "",
    timestamp: "",
    entity: ""
  }]
  if(showSplash){
    dispatch(actions.startCall());
  }
  
  return requestFromServer
    .getBankAccounts(idClient)
    .then(response => {      
      const bankAccountsList = response;
      dispatch(actions.bankAccountsFetched( {bankAccounts: bankAccountsList} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.bankAccountsFetched( {bankAccounts: mock} ));
      dispatch(actions.finishCall());
    });
}

export const getBankAccountById = (idAccount) => dispatch => {

  dispatch(actions.startCallId());
  return requestFromServer
    .getBankAccountById(idAccount)
    .then(response => {      
      const bankAccount = response;
      dispatch(actions.bankAccountFetched( {bankAccount: bankAccount} ));
      dispatch(actions.finishCallId());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.bankAccountFetched([]));
      dispatch(actions.finishCallId());
    });
}

export const getClientById = (id) => dispatch => {

  dispatch(actions.startCallClient());
  return getOne(id)
    .then(response => {      
      const client = response;
      dispatch(actions.clientFetched( {client: client} ));
      dispatch(actions.finishCallClient());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.clientFetched([]));
      dispatch(actions.finishCallClient());
    });
}



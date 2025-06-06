import * as requestFromServer from "./accountingCrud";
import {accountingMayorSlice} from "./accountingMayorSlice";

const {actions} = accountingMayorSlice;

export const getAllAccountingMayor = (data) => dispatch => {

  dispatch(actions.startCall());
  return requestFromServer
    .getMayorVista(data)
    .then(response => {
      const  accountingMayor  = response;
      dispatch(actions.accountingMayorFetched( {accountingMayor} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.accountingMayorFetched({accountingMayor:[]}));
      dispatch(actions.finishCall());
    });
}

import * as requestFromServer from "./accountingCrud";
import {accountingSlice} from "./accountingSlice";

const {actions} = accountingSlice;

export const getAllAccountingBooks = (data) => dispatch => {

  dispatch(actions.startCall());
  return requestFromServer
    .getBooksVista(data)
    .then(response => {
      const  accountingBooks  = response;
      dispatch(actions.accountingBooksFetched( {accountingBooks} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.accountingBooksFetched({accountingBooks:[]}));
      dispatch(actions.finishCall());
    });
}

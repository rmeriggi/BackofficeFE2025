import * as requestFromServer from "./blottersCrud";
import {blotterCashSlice} from "./blottersSlice";


const {actions}=blotterCashSlice

export const getAllCash = (forceLoading, from , to, idMoney) => dispatch => {

  if(forceLoading){
    dispatch(actions.startCall());
  }

return requestFromServer
  .getAllCash(from, to, idMoney)
  .then(response => {
    const  cashList  = response;
    dispatch(actions.cashFetched( {cash: cashList} ));
    dispatch(actions.finishCall());
  })
  .catch(error => {
    console.error(error.message);
    dispatch(actions.cashFetched({species: []}));
    dispatch(actions.finishCall());
  });
}


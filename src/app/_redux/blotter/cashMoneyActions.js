import * as requestFromServer from "./blottersCrud";
import {blotterCashMoneySlice} from "./blottersSlice";


const {actions}=blotterCashMoneySlice

export const getAllCashMoney = (forceLoading, from , to, deadline) => dispatch => {

  if(forceLoading){
    dispatch(actions.startCall());
  }

return requestFromServer
  .getAllCashMoney(from, to, deadline)
  .then(response => {
    const  cashMoneyList  = response;
    dispatch(actions.cashMoneyFetched( {cashMoney: cashMoneyList} ));
    dispatch(actions.finishCall());
  })
  .catch(error => {
    console.error(error.message);
    dispatch(actions.cashMoneyFetched({cashMoney: []}));
    dispatch(actions.finishCall());
  });
}


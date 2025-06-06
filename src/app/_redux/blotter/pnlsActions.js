import * as requestFromServer from "./blottersCrud";
import { blotterPnlSlice } from "./blottersSlice";

const {actions}=blotterPnlSlice


export const getAllPnl = (forceLoading, from , to, idMoney, idComitente) => dispatch => {

  if(forceLoading){
    dispatch(actions.startCall());
  }

return requestFromServer
  .getAllPnl(from, to, idMoney, idComitente)
  .then(response => {
    const  pnlList  = response;
    dispatch(actions.pnlsFetched( {pnls: pnlList} ));
    dispatch(actions.finishCall());
  })
  .catch(error => {
    console.error(error.message);
    dispatch(actions.pnlsFetched({pnls: []}));
    dispatch(actions.finishCall());
  });
}



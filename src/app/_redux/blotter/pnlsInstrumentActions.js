import * as requestFromServer from "./blottersCrud";
import { blotterPnlInstrumentSlice } from "./blottersSlice";

const {actions}=blotterPnlInstrumentSlice


export const getAllPnlInstrument = (forceLoading, from , to, idMoney, idComitente) => dispatch => {
  if(forceLoading){
    dispatch(actions.startCall());
  }

return requestFromServer
  .getAllPnlInstrument(from, to, idMoney, idComitente)
  .then(response => {
    const  pnlsInstrumentList  = response;
    dispatch(actions.pnlsInstrumentFetched( {pnlsInstrument: pnlsInstrumentList} ));
    dispatch(actions.finishCall());
  })
  .catch(error => {
    console.error(error.message);
    dispatch(actions.pnlsInstrumentFetched({pnlsInstrument: []}));
    dispatch(actions.finishCall());
  });
}



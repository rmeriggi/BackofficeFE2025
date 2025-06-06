import * as requestFromServer from "./blottersCrud";
import { blotterPnlSpeciesSlice } from "./blottersSlice";

const {actions}=blotterPnlSpeciesSlice


export const getAllPnlSpecies = (forceLoading, from , to, idMoney, idComitente) => dispatch => {

  if(forceLoading){
    dispatch(actions.startCall());
  }

return requestFromServer
  .getAllPnlSpecies(from, to, idMoney, idComitente)
  .then(response => {
    const  pnlSpeciesList  = response;
    dispatch(actions.pnlsSpeciesFetched( {pnlsSpecies: pnlSpeciesList} ));
    dispatch(actions.finishCall());
  })
  .catch(error => {
    console.error(error.message);
    dispatch(actions.pnlsSpeciesFetched({pnlsSpecies: []}));
    dispatch(actions.finishCall());
  });
}



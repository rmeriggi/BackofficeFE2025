import * as requestFromServer from "./blottersCrud";
import { blotterSpeciesInstrumentSlice} from "./blottersSlice";


const {actions}=blotterSpeciesInstrumentSlice

export const getAllSpeciesInstrument = (forceLoading, from , to, idMoney, market) => dispatch => {

  if(forceLoading){
    dispatch(actions.startCall());
  }

return requestFromServer
  .getAllSpeciesInstrument(from, to, idMoney, market)
  .then(response => {
    const  speciesInstrumentList  = response;
    dispatch(actions.speciesInstrumentFetched( {speciesInstrument: speciesInstrumentList} ));
    dispatch(actions.finishCall());
  })
  .catch(error => {
    console.error(error.message);
    dispatch(actions.speciesInstrumentFetched({speciesInstrument: []}));
    dispatch(actions.finishCall());
  });
}



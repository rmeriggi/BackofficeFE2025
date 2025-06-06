import * as requestFromServer from "./blottersCrud";
import { blotterSpeciesSlice} from "./blottersSlice";


const {actions}=blotterSpeciesSlice

export const getAllSpecies = (forceLoading, from , to, idMoney) => dispatch => {

  if(forceLoading){
    dispatch(actions.startCall());
  }

return requestFromServer
  .getAllSpecies(from, to, idMoney)
  .then(response => {
    const  speciesList  = response;
    dispatch(actions.speciesFetched( {species: speciesList} ));
    dispatch(actions.finishCall());
  })
  .catch(error => {
    console.error(error.message);
    dispatch(actions.speciesFetched({species: []}));
    dispatch(actions.finishCall());
  });
}



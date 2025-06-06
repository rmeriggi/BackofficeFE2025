import * as requestFromServer from "./signaturesCrud";
import {signaturesClientsSlice} from "./signaturesSlice";

const {actions} = signaturesClientsSlice;

export const getAllSignaturesClients = (search) => dispatch => {

  dispatch(actions.startCall());
  return requestFromServer
    .getClientsResum(search)
    .then(response => {
      const  signaturesClients  = response;
      dispatch(actions.clientsSignaturesFetched( {signaturesClients: signaturesClients} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.clientsSignaturesFetched([]));
      dispatch(actions.finishCall());
    });
}
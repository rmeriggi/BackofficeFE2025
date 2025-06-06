import * as requestFromServer from "./clientsCrud";
import {clientsSlice} from "./clientsSlice";

const {actions} = clientsSlice;

export const getAllClients = (search) => dispatch => {

  dispatch(actions.startCall());
  return requestFromServer
    .getClients(search)
    .then(response => {
      const { clientsList } = response;
      dispatch(actions.clientsFetched( {clients: clientsList} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.clientsFetched([]));
      dispatch(actions.finishCall());
    });
}
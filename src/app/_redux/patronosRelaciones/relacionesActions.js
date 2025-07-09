import * as requestFromServer from "./relacionesCrud";
import { callTypes, relacionesSlice } from "./relacionesSlice";

const { actions } = relacionesSlice;

export const getAllRelaciones = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllRelaciones()
    .then((response) => {
      dispatch(actions.relacionesFetched({ relaciones: response.data }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createRelacion = (patronoId, clienteId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRelacion(patronoId, clienteId)
    .then((response) => {
      dispatch(actions.relacionCreated({ relacion: response.data }));
      // Refrescar la lista después de crear
      dispatch(getAllRelaciones());
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRelacion = (relacionId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRelacion(relacionId)
    .then((response) => {
      dispatch(actions.relacionDeleted({ relacionId }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

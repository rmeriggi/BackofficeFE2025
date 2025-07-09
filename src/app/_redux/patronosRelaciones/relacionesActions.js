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
      const { success, id } = response.data;
      if (success && id > 0) {
        // Limpiar el estado de acciones y refrescar la lista
        dispatch(actions.resetState());
        dispatch(getAllRelaciones());
      } else {
        throw new Error("Error al crear la relación");
      }
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error; // Re-throw para que el componente pueda manejarlo
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

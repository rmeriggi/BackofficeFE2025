import * as requestFromServer from "./patronosCrud";
import { callTypes, patronosSlice } from "./patronosSlice";

const { actions } = patronosSlice;

export const getAllPatronos = (search = "*") => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllPatronos(search)
    .then((response) => {
      dispatch(actions.patronosFetched({ patronos: response.data }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const getPatronoById = (patronoId) => (dispatch) => {
  if (!patronoId) {
    return dispatch(actions.patronoFetched({ patrono: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPatronoById(patronoId)
    .then((response) => {
      dispatch(actions.patronoFetched({ patrono: response.data }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPatrono = (patrono) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPatrono(patrono)
    .then((response) => {
      const { success, id } = response.data;
      if (success && id > 0) {
        // Limpiar el estado de acciones y refrescar la lista
        dispatch(actions.resetState());
        dispatch(getAllPatronos());
        return { success: true, id };
      } else {
        throw new Error("Error al crear el patrono");
      }
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error; // Re-throw para que el componente pueda manejarlo
    });
};

export const updatePatrono = (patrono) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePatrono(patrono)
    .then((response) => {
      dispatch(actions.patronoUpdated({ patrono: response.data }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePatrono = (patronoId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePatrono(patronoId)
    .then((response) => {
      dispatch(actions.patronoDeleted({ patronoId }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

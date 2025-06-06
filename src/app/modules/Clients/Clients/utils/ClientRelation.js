import * as requestFromServer from "./service";
import { clienteRelationsSlice } from "./clienteRelationsSlice";

const { actions } = clienteRelationsSlice;

export const addNewClientRelation = (clientRelationData) => async (
  dispatch
) => {
  dispatch(actions.startCall());
  try {
    const response = await requestFromServer.addNewClientRelation(
      clientRelationData
    );
    dispatch(actions.clientRelationAdded(response));
    dispatch(actions.finishCall());
  } catch (error) {
    console.error(error.message);
    dispatch(actions.clientRelationAddedFailure());
    dispatch(actions.finishCall());
  }
};

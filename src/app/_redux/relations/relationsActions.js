import * as requestFromServer from "./relationsCrud";
import { relationsSlice } from "./relationsSlice";

const { actions } = relationsSlice;

export const getAllRelations = (idClient, showSplash) => async (dispatch) => {
  if(showSplash){
    dispatch(actions.startCall());
  }
  try {
    const response = await requestFromServer.getAllPersons(idClient);
    dispatch(actions.relationsFetched({ relations: response }));
    dispatch(actions.finishCall());
  } catch (error) {
    console.error(error.message);
    dispatch(actions.relationsFetched([]));
    dispatch(actions.finishCall());
  }
};

export const getRelationById = (idRelation) => async (dispatch) => {
  dispatch(actions.startCallId());
  try {
    const response = await requestFromServer.getRelationById(idRelation);
    dispatch(actions.relationFetched({ relation: response }));
    dispatch(actions.finishCallId());
  } catch (error) {
    console.error(error.message);
    dispatch(actions.relationFetched(null));
    dispatch(actions.finishCallId());
  }
};

export const updateRelation = (relationData) => async (dispatch) => {
  dispatch(actions.startCall());
  try {
    await requestFromServer.updateRelation(relationData);
    dispatch(actions.updateRelationSuccess(relationData));
    dispatch(actions.finishCall());
  } catch (error) {
    console.error(error.message);
    dispatch(actions.updateRelationFailure());
    dispatch(actions.finishCall());
  }
};

import * as requestFromServer from "./echecksCrud";
import { echecksSlice } from "./echeksSlice";

const { actions } = echecksSlice;

export const getAllEchecks = () => async (dispatch) => {
  // if(showSplash){
  //   dispatch(actions.startCall());
  // }
  try {
    const response = await requestFromServer.getAllEchecks();
    dispatch(actions.echecksFetched({ echecks: response }));
    dispatch(actions.finishCall());
  } catch (error) {
    console.error(error.message);
    dispatch(actions.echecksFetched([]));
    dispatch(actions.finishCall());
  }
};

export const getRelationById = (id) => async (dispatch) => {
  dispatch(actions.startCallId());
  try {
    const response = await requestFromServer.getEcheckById(id);
    dispatch(actions.echeckFetched({ echeck: response }));
    dispatch(actions.finishCallId());
  } catch (error) {
    console.error(error.message);
    dispatch(actions.echeckFetched(null));
    dispatch(actions.finishCallId());
  }
};



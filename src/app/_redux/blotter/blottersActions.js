import * as requestFromServer from "./blottersCrud";
import {blottersSlice} from "./blottersSlice";
import { useSelector } from "react-redux";

const {actions} = blottersSlice;

export const getAllBlotters = (forceLoading, from , to) => dispatch => { 
    if(forceLoading){
      dispatch(actions.startCall());
    }
  
  return requestFromServer
    .getAllBlotterList(from, to)
    .then(response => {
      const  blottersList  = response;
      dispatch(actions.blottersFetched( {blotters: blottersList} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      dispatch(actions.blottersFetched({blotters: []}));
      dispatch(actions.finishCall());
    });
}

export const setFromBlotters = (from) => dispatch => {
    dispatch(actions.fromFetched({fromBlotter: from })); 
}

export const setToBlotters = (to) => dispatch => {
  dispatch(actions.toFetched({toBlotter: to })); 
}




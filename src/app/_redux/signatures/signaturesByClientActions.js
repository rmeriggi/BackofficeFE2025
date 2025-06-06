import * as requestFromServer from "./signaturesCrud";
import {signaturesByClientSlice} from "./signaturesSlice";

const {actions} = signaturesByClientSlice;

export const getSignaturesByClient = (id) => dispatch => {

  dispatch(actions.startCall());
  return requestFromServer
    .getSignaturesByClientId(id)
    .then(response => {      
      const  signaturesByClient  = response;
      dispatch(actions.signaturesByclientFetched( {signaturesByClient: signaturesByClient} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.signaturesByclientFetched({signaturesByClient: []}));
      dispatch(actions.finishCall());
    });
}
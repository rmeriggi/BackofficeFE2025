import * as requestFromServer from "./invoicesCrud";
import { invoicesSlice } from "./invoicesSlice";

const { actions } = invoicesSlice;

export const getAllInvoices = () => (dispatch) => {
  dispatch(actions.startCall());
  return requestFromServer
    .getInvoices()
    .then((response) => {
      const invoices = response;
      dispatch(actions.invoicesFetched({ invoices: invoices }));
      dispatch(actions.finishCall());
    })
    .catch((error) => {
      console.error(error.message);
      dispatch(actions.invoicesFetched({ invoices: [] }));
      dispatch(actions.finishCall());
    });
};

export const createNewInvoice = (invoiceData) => (dispatch) => {
  dispatch(actions.startCall());
  return requestFromServer
    .createInvoice(invoiceData)
    .then(() => {
      dispatch(actions.invoiceCreated());
      dispatch(getAllInvoices()); 
      dispatch(actions.finishCall());
    })
    .catch((error) => {
      console.error(error.message);
      dispatch(actions.catchError({ error: error.message }));
      dispatch(actions.finishCall());
    });
};

export const deleteInvoice = (id) => (dispatch) => {
  dispatch(actions.startCall());
  return requestFromServer
    .deleteInvoice(id)
    .then(() => {
      dispatch(getAllInvoices()); 
      dispatch(actions.finishCall());
    })
    .catch((error) => {
      console.error(error.message);
      dispatch(actions.catchError({ error: error.message }));
      dispatch(actions.finishCall());
    });
};

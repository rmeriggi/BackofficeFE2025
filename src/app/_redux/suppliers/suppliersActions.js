import * as requestFromServer from "./suppliersCrud";
import { suppliersSlice } from "./suppliersSlice";

const { actions } = suppliersSlice;

export const getAllSuppliers = () => (dispatch) => {
  dispatch(actions.startCall());
  return requestFromServer
    .getSuppliers()
    .then((response) => {
      const suppliers = response;
      
      const suppliersWithKeys = suppliers.map((supplier) => ({
        ...supplier,
        key: supplier.id || supplier.name, 
      }));
      
      dispatch(actions.suppliersFetched({ suppliers: suppliersWithKeys }));
      dispatch(actions.finishCall());
    })
    .catch((error) => {
      console.error(error.message);
      dispatch(actions.suppliersFetched([]));
      dispatch(actions.finishCall());
    });
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices } from "../_redux/invoices/InvoicesActions";

export const useFetchInvoices = () => {
  const dispatch = useDispatch();
  const { invoices, loading } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const reloadInvoices = () => {
    dispatch(getAllInvoices());
  };

  return [invoices, loading, reloadInvoices];
};

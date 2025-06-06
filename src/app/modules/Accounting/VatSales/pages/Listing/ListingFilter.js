/* eslint-disable eqeqeq */
import React from 'react';
import { Button } from '@material-ui/core';
import { useModal } from '../../../../../hooks/useModal';
import { FiltersModal } from '../../components/modals/FiltersModal';
import { getVatSalesPdf } from '../../../../../_redux/accounting/accountingCrud';

const ListingFilter = ({
  dataTable,
  enableLoading,
  disableLoading,
  setVatSalesData,
  paramsAuxAccounts,
  setParamsAuxAccounts,
}) => {
  const [show, openModal, closeModal] = useModal();

  const handleDownloadReport = async () => {
    const requestValues = {
      month: paramsAuxAccounts.month,
      year: paramsAuxAccounts.year,
    };

    try {
      const response = await getVatSalesPdf(requestValues);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'vat_sales_report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the report', error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="symbol-label ml-3" onClick={handleDownloadReport}>
          <i className="flaticon2-download icon-xl text-primary" role="button"></i>
        </div>
        <Button variant="contained" color="secondary" onClick={openModal} className="ml-2">
          Filtros
        </Button>
      </div>

      <FiltersModal
        show={show}
        onHide={closeModal}
        setVatSalesData={setVatSalesData}
        paramsAuxAccounts={paramsAuxAccounts}
        setParamsAuxAccounts={setParamsAuxAccounts}
        enableLoading={enableLoading}
        disableLoading={disableLoading}
      />
    </>
  );
};

export default ListingFilter;

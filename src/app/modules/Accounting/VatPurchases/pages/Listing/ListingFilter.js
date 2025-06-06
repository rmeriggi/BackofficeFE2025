import React from 'react';
import { Button } from '@material-ui/core';
import { useModal } from '../../../../../hooks/useModal';
import { FiltersModal } from '../../components/modals/FiltersModal';
import { getVatPurchasesPdf } from '../../utils/api';
import * as XLSX from 'xlsx';  
const ListingFilter = ({
  dataTable,
  enableLoading,
  disableLoading,
  setVatPurchasesData,
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
      const response = await getVatPurchasesPdf(requestValues);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'vat_purchases_report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the report', error);
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dataTable);  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'IVA Compras');

    XLSX.writeFile(wb, 'IVA_Compras.xlsx');  
  };

  return (
    <>
      <div>
        <Button variant="contained" color="secondary" onClick={openModal}>
          Filtros
        </Button>
        <Button variant="contained" color="primary" onClick={handleDownloadExcel}>
          Descargar Excel
        </Button>
      </div>
      <div className="symbol-label ml-3" onClick={handleDownloadReport}>
        <i className="flaticon2-download icon-xl text-primary" role="button"></i>
      </div>

      <FiltersModal
        show={show}
        onHide={closeModal}
        setVatPurchasesData={setVatPurchasesData}
        paramsAuxAccounts={paramsAuxAccounts}
        setParamsAuxAccounts={setParamsAuxAccounts}
        enableLoading={enableLoading}
        disableLoading={disableLoading}
      />
    </>
  );
};

export default ListingFilter;

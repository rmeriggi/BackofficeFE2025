import React from 'react';
import { getVatSalesPdf } from '../../../../../_redux/accounting/accountingCrud'; 

export const DownloadVatSales = ({ params, name }) => {

  const handleDownloadReport = async () => {
    try {
      const response = await getVatSalesPdf(params);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the report", error);
    }
  };

  return (
    <div className="symbol-label ml-7" onClick={handleDownloadReport}>
      <i className="flaticon2-download icon-xl text-primary" role="button"></i>
    </div>
  );
};

import React from 'react';
import { getDiaryBookPdf } from '../../../Accounting/AuxiliaryAccounts/utils/service'; 

export const DownloadArchive = ({ listing, data, name }) => {

  const handleDownloadReport = async () => {
    const requestValues = {
      idEntity: data.idEntity || 456,
        idCurrency: data.idCurrency || 1,
      fromDate: data.fromDate || "2023-01-01T00:00:00Z",
      toDate: data.toDate || "2023-12-31T23:59:59Z",
      idAuxiliary: data.idAuxiliary || 789,
      country: data.country || 1
    };

    console.log('Request Values:', requestValues);

    try {
      const response = await getDiaryBookPdf(requestValues);

      console.log('PDF Response:', response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "diary_book_report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the report", error);
    }
  };

  return (
    listing?.length > 0 ? 
      (
      <div className="symbol-label ml-7" onClick={handleDownloadReport}>
          <i className="flaticon2-download icon-xl text-primary" role="button"></i>
      </div>
      ):(
      <div className="symbol-label ml-7">
          <i className="flaticon2-download icon-xl text-secondary"></i>
      </div>
    )
  );
};

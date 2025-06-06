import React from 'react';
import { downloadGeneralBookReport } from '../Listing/service';

export const DownloadArchive = ({ listing, data, name, idEntity, idCurrency, idAuxiliary, country }) => {

  const handleDownloadReport = async () => {
    const requestValues = {
      idEntity: idEntity || 456,  
      idCurrency: idCurrency || 1,  
      fromDate: data.fromDate,
      toDate: data.toDate,
      idAuxiliary: idAuxiliary || 789,  
      country: country || 1,  
    };
    
    try {
      const response = await downloadGeneralBookReport(requestValues);

      if (response && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "book_report.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("La respuesta no contiene datos válidos para la descarga.");
      }
    } catch (error) {
      console.error("Error descargando el reporte", error);
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

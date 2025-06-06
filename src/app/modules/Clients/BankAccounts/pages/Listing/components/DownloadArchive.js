import React from 'react'
import { getExcel } from '../../../utils/exportExcel'

export const DownloadArchive = ({listing, data, name}) => {

  const { header, properties } = data

  const propertiesData = {
    header,
    properties ,
    array: listing,
}

  return (
    listing?.length > 0 ? 
      (
      <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, name)}>
          <i className="flaticon2-download icon-xl text-primary" role="button"></i>
      </div>
      ):(
      <div className="symbol-label ml-7">
          <i className="flaticon2-download icon-xl text-secondary"></i>
      </div>
    )
  )
}
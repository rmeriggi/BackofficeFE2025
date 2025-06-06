import React from 'react'
import { getExcel } from '../../../../utils/exportExcel'
import { SimpleCard } from '../../../../components'

export default function CardAmountSum({sum, valuesToExcel, nameExcel}) {

  return (
    <div className="bg-white rounded shadow-sm mb-5 p-5 ">
      <div style={{height: "70px"}} className="p-2 d-flex justify-content-between align-items-center">
        <SimpleCard title="Total" data={sum} />
        {valuesToExcel.array && valuesToExcel.array?.length !== 0 ? 
        (
        <div className="symbol-label mr-7" onClick={() => getExcel(valuesToExcel, nameExcel)}>
          <i className="flaticon2-download icon-xl text-primary" role="button"></i>
        </div>
        ):(
        <div className="symbol-label mr-7">
          <i className="flaticon2-download icon-xl text-secondary"></i>
        </div>
        )}
      </div>
    </div>
  )
}

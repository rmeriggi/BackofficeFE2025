import React from 'react'
import { getExcel } from '../../../../utils/exportExcel'
import { SimpleCard } from '../../../../components'

export default function CardAmountSum({sum, valuesToExcel, nameExcel}) {

  const balancesFiltered = valuesToExcel.array?.filter(v => v.businessName !== "")
  
  return (
    <div className="bg-white rounded shadow-sm mb-5 p-5 ">
      <div style={{height: "70px"}} className="p-2 d-flex justify-content-end align-items-center">
        <h2 className="font-bold mr-auto">Saldo contable al cierre</h2>
        <SimpleCard title="Total" data={sum}/>
        {balancesFiltered && balancesFiltered.length !== 0 ? 
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

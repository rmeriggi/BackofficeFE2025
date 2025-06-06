import React from 'react'
import { getExcel } from '../../../../utils/exportExcel'
import SimpleCard from '../../../../components/SimpleCard'

export default function CardAmountSum({sum}) {

  return (
    <div className="bg-white rounded shadow-sm mb-5 p-5 ">
      <div style={{height: "70px"}} className="p-2 d-flex justify-content-between align-items-center">
        <SimpleCard title="Total" data={sum} />
       </div>
    </div>
  )
}

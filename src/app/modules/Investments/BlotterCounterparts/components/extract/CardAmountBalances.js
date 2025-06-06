import React from 'react'
import { SimpleCard } from '../../../../../components'
import { getExcel } from '../../../../../utils/exportExcel'
import AccountsData from "../AccountsData"

const filterBalances = (balances) => {
  const { initialBalance, finalBalance} = balances
  return [
    {title: "Saldo inicial", data: initialBalance},
    {title: "Saldo final", data : finalBalance},
  ]
} 

export default function CardAmountBalances({balances, valuesToExcel, account, nameExcel}) {

  const arr = filterBalances(balances)
  
  return (
    <div className="bg-white rounded shadow-sm mb-5 p-5 d-flex justify-content-between align-items-center">
      <AccountsData account={account}/>
      {arr.map(d => <SimpleCard key={d.title} title={d.title} data={d.data} /> )}
      <div>
        {valuesToExcel?.array && valuesToExcel?.array?.length !== 0 ? 
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

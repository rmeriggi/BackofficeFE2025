import React from 'react'

export default function AccountsData({account}) {
  return (
    <div> 
      <div className="d-flex flex-wrap"> 
        <span className='text-muted mr-3'>Razón Social: {"localizador1"}</span>
        <span className='text-muted '>CUIT: {"localizador1"}</span>
      </div>
      <div className="d-flex flex-wrap"> 
        <span className='text-muted mr-3'>Alias: {"localizador1"}</span>
        <span className='text-muted'>CVU: {"localizador1"}</span>
      </div>
    </div>
  )
}

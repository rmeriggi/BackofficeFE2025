import React from 'react'

export default function AccountsData({account}) {
  return (
    <div> 
      <div className="d-flex flex-wrap"> 
        <span className='text-muted mr-3'>Razón Social: {account?.businessName}</span>
        <span className='text-muted '>CUIT: {account?.cuit}</span>
      </div>
      <div className="d-flex flex-wrap"> 
        <span className='text-muted mr-3'>Alias: {account?.alias}</span>
        <span className='text-muted'>CVU: {account?.cvu}</span>
      </div>
    </div>
  )
}

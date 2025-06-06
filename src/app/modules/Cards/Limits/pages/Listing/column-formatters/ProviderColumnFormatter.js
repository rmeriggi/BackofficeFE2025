import React from 'react'

export function ProviderColumnFormatter(cellContent, row) {
  return (
    <>
      <p className="m-0">{row.providerName}</p>
      <span className='text-muted'>
        {row.providerLastname}
      </span>
    </>
  );
}
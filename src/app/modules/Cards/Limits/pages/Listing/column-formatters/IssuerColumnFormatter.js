import React from 'react'

export function IssuerColumnFormatter(cellContent, row) {
  return (
    <>
      <p className="m-0">{row.issuerName}</p>
      <span className='text-muted'>
        {row.issuerLastname}
      </span>
    </>
  );
}
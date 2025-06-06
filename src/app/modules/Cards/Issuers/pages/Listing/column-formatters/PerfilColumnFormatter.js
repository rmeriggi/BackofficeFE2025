import React from 'react'

export function PerfilColumnFormatter(cellContent, row) {
  return (
    <>
      <p className="m-0">{row.email}</p>
      <span className='text-muted'>
        {row.passport}
      </span>
    </>
  );
}
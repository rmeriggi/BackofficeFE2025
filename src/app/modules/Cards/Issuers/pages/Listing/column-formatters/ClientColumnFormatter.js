import React from 'react'

export function ClientColumnFormatter(cellContent, row) {
  return (
    <>
      <p className="m-0">{row.name}</p>
      <span className='text-muted'>
        {row.lastname}
      </span>
    </>
  );
}
import React from 'react'

export function ClientColumnFormatter(cellContent, row) {
  return (
    <>
      <p className="m-0">{"Lazo, Juan M"}</p>
      <span className='text-muted'>
        {row.idClient}
      </span>
    </>
  );
}
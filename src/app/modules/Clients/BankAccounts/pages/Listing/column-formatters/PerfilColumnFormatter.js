import React from 'react'

export function PerfilColumnFormatter(cellContent, row) {
  return (
    <>
      <p className="m-0">{"lazo.juan@myhnt.com.ar"}</p>
      <span className='text-muted'>
        {row.cuit}
      </span>
    </>
  );
}
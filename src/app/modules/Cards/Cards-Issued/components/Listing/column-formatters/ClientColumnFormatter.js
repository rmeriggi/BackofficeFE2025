import React from 'react'

export function ClientColumnFormatter(cellContent, row) {
  return (
    <>
      <p className="m-0">{row.holder}</p>
    </>
  );
}
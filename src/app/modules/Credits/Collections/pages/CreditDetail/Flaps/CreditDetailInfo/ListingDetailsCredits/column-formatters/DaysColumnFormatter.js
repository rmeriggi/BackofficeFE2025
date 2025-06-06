/* eslint-disable default-case */
/* eslint-disable eqeqeq */
import React from 'react'

export function DaysColumnFormater(cellContent, row) {
  
  const getdays = () => {
    const today = new Date().getTime();
    const date = new Date(row.expiration).getTime();
    const diff = Math.floor((today-date)/(1000*60*60*24));

    if((diff > 0)&& (row.pending !==0)) {
        return diff
    } else {
        return '-'
    }
  }

  return (
        <span>{getdays()}</span>
  );
}

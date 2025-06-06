import React from 'react'
import { CircularProgress } from "@material-ui/core";

export function LoadingList({ fetched }) {
  
  return(
    <>
      <span className="mr-2">Listado</span>
      {
        fetched && <CircularProgress size={15} color="secondary"/>
      }
    </>
  )
}
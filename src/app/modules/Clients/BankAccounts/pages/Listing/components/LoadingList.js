import React from 'react'
import { CircularProgress } from "@material-ui/core";


export function LoadingList({ client , fetched }) { 
  return(
    <>
    {!client || fetched ? <CircularProgress size={15} color="secondary"/>:
    <div>
    <p className="m-0">Cuentas bancarias</p>
    <span className='text-muted'>
      {client.client.client.name + " "+ client.client.client.lastName }
    </span>
  </div>
     }
    </>
  )
}
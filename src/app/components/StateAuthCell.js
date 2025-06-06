import React, { useState } from 'react'
import { CircularProgress } from "@material-ui/core";
import { estilo } from '../utils/column-formatter/chargeColumnFormatter';
import { updateAuthorizedBlotter } from '../_redux/blotter/blottersCrud';
import { getAllBlotters } from '../_redux/blotter/blottersActions';
import { useDispatch } from 'react-redux';

export function StateAuthCell({ fetched , idCharge , id, TransferPrice, performance, notes, FX }) {
  const [status, setState]=useState(idCharge)
  const [loading, setLoading]=useState(false)
  const dispatch = useDispatch();
  async function handleSelectAuthorized(e) {
    const values={
       id: Number(id),
       auth: Number(e.target.value),
       tranferPrice: Number(TransferPrice),
       performance: Number(performance),
       notes,
       FX
     }  
     try {
       setLoading(true)
       await updateAuthorizedBlotter(values)
       await dispatch(getAllBlotters())
       setState(e.target.value)       
       setLoading(false)
     } catch  {
       setLoading(false)      
     }
  
   }
  
  return(
    <>
     { loading  ?
      <CircularProgress size={15} color="secondary"/>:
      <select defaultValue={status} onChange={handleSelectAuthorized} style={estilo[status-1]} className="badge badge-success">
        <option value={1}>SI</option>
        <option value={2}>NO</option>
     </select>}
    </>
  )
}
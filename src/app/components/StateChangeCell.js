import React, { useState } from 'react'
import { CircularProgress } from "@material-ui/core";
import { estilo } from '../utils/column-formatter/chargeColumnFormatter';
import { updateCharged } from '../_redux/blotter/blottersCrud';
import { useDispatch } from "react-redux";
import { getAllBlotters } from '../_redux/blotter/blottersActions';

export function StateChangeCell({ fetched , idCharge , id, market }) {
  const [status, setState]=useState(idCharge)
  const [loading, setLoading]=useState(false)
  const dispatch = useDispatch();

  async function handleSelectChange(e) {
   const values={
      id: Number(id),
      charge: Number(e.target.value)
    }  

    try {
      setLoading(true)
      await updateCharged(values)
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
      <select defaultValue={status} onChange={handleSelectChange} style={estilo[status-1]} className="badge badge-success">
        <option value={1}>SI</option>
        <option value={2}>NO</option>
        <option disabled={market === 'MAECLEAR'} value={3}>QUANTEX</option>
     </select>}
    </>
  )
}
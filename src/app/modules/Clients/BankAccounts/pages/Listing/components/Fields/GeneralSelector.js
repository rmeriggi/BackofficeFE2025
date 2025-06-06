/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { CircularProgress, InputAdornment, MenuItem, TextField } from '@material-ui/core'
import { useLoading } from '../../../../../../../hooks/useLoading'
import { useEffect } from 'react'

export const GeneralSelector = ({
  values, 
  valueName,
  keyName, 
  label, 
  data, 
  setFieldValue,
  insideOnchange,
  extraMenuItem,
  disabled,
  valueKey
}) => {

  const {loading, disableLoading} = useLoading()

  useEffect(() => {
    if(data){
      disableLoading()
    }
  }, [data])
  
  return (
    <TextField
      fullWidth
      color='secondary'
      select
      size="small"
      label={label}
      variant="outlined"
      value={data?.length === 0 || loading ? 0 : values[valueName]}
      disabled={data?.length === 0 || disabled || loading}
      onChange={(e) => {
        setFieldValue(valueName, e.target.value)
        insideOnchange &&  insideOnchange(e)
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end" >
          {
          loading &&
            <CircularProgress size={20} color="secondary" className='mr-3'/> 
          }
        </InputAdornment>,
      }}
    >
      {extraMenuItem && extraMenuItem}
      {
        loading && 
        <MenuItem key={0} value={0}>
          Cargando
        </MenuItem>
      }
      {
        data?.length === 0 &&
          <MenuItem key={0} value={0}>
            Sin resultados
        </MenuItem>
      }
      {
        data  && data.length > 0 &&
        data.map((c) => (
        <MenuItem key={valueKey ? c[valueKey] : c.id} value={valueKey ? c[valueKey] : c.id}>
            {c[keyName].trim()}
        </MenuItem>
        ))
      }
    </TextField>
  )
}
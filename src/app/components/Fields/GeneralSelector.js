/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { CircularProgress, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { useLoading } from '../../hooks/useLoading';

export const GeneralSelector = ({
  values, 
  valueName,
  keyName, 
  keyLastName,
  label, 
  data, 
  setFieldValue,
  insideOnchange,
  extraMenuItem,
  disabled,
  valueKey
}) => {

  const {loading, disableLoading} = useLoading();

  useEffect(() => {
    if(data){
      disableLoading();
    }   
  }, [data, disableLoading]);
  
  return (
    <TextField
      fullWidth
      color='secondary'
      select
      size="small"
      label={label}
      variant="outlined"
      value={data?.length === 0 || loading ? 0 : values[valueName]} // Verifica que el value esté correctamente configurado
      disabled={data?.length === 0 || disabled || loading}
      onChange={(e) => {
        setFieldValue(valueName, e.target.value);
        insideOnchange &&  insideOnchange(e);
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
        data.map((c) =>{ 
          return (
            <MenuItem key={valueKey ? c[valueKey] : c.id} value={valueKey ? c[valueKey] : c.id}>
              {keyLastName 
                ? `${(c[keyName] || '').trim()} ${(c[keyLastName] || '').trim()}` 
                : (c[keyName] || '').trim()}
            </MenuItem>
          )})
      }
    </TextField>
  )
}

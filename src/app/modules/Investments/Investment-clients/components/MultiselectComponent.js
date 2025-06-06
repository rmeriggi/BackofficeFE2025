import React, { useState } from 'react';
import { 
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Input
} from '@material-ui/core';

const getProperty = (e, property) => {
    return e[property]
}

export const MultiselectComponent = ({label, array, property, disabled, filters, setFilters}) => {
  
  const [state, setState] = useState([0]);

  function handleChange(event) {
    const { value } = event.target
    if(value.find(e => e === 0) === 0 ){
      setState([0])
      setFilters({...filters, round: [0]})
    }else{
      const arr = [];
      for (let i = 0, l = value.length; i < l; i += 1) {
        if (value[i].selected) {
          arr.push(value[i].value);
        }
      }
      setState(value);
      setFilters({...filters, round: value})
    }
  }

  return (
    <FormControl  fullWidth>
      <InputLabel htmlFor="select-multiple-checkbox">
        {label}
      </InputLabel>
      <Select
        multiple
        value={state}
        onChange={handleChange}
        input={<Input />}
        disabled={disabled}
        >
        <MenuItem key={0} value={0}>
            Todos
        </MenuItem>
          {array.map(e => (
            <MenuItem key={e.id} value={e.id}>
              {getProperty(e, property)}
            </MenuItem>
        ))} 
      </Select>
    </FormControl>
  )
}
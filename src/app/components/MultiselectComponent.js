import React, { useState } from 'react';
import { 
    FormControl,
    MenuItem,
    InputLabel,
    Checkbox,
    ListItemText,
    Select,
    Input
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getProperty = (e, property) => {
    return e[property]
}

export const MultiselectComponent = ({input, classes, array, property, disabled, setFieldValue, name}) => {
    const [state, setState] = useState([0]);

    function handleChange(event) {
        if(event.target.value[event.target.value.length - 1] === 0){
          const arr = array.map(p => p.id)
          setState([0, ...arr])
          setFieldValue(`${name}`, [0, ...arr])
        }else{
          if(event.target.value.find(e => e === 0) !== 0 ){
            if(event.target.value.length === array.length){
              if(event.target.value.length > state.length) {
                const arr = array.map(p => p.id)
                setState([0, ...arr])
                setFieldValue(`${name}`, [0, ...arr])
              } else {
                setState([])
                setFieldValue(`${name}`, [])
              }
            }else{
              setState(event.target.value)
              setFieldValue(`${name}`, event.target.value)
            }
          }else{
            const newArr = event.target.value.filter(e => e !== 0)
            setState(newArr)
            setFieldValue(`${name}`, state)
          }
        }
    }

    return (
        <FormControl >
            <InputLabel className={classes.inputLabel} htmlFor="select-multiple-checkbox">
                {input}
            </InputLabel>
            <Select
                multiple
                value={state}
                onChange={handleChange}
                input={<Input  id="select-multiple-checkbox" />}
                renderValue={selected => {
                    if(selected.indexOf(0) <= -1) {
                        const productsSelected = selected.filter(e => e !== 0).map(s => {
                            return array.find(m => m.id === s)[property].trim()
                        })
                        return productsSelected.join(', ')
                    } else {
                        return "TODOS"
                    }
                }}
                MenuProps={MenuProps}
                style={{width: '300px'}}
                disabled={disabled}
                >
                <MenuItem key={0} value={0}>
                    <Checkbox checked={state.indexOf(0) > -1}/>
                    <ListItemText primary={"TODOS"} />
                </MenuItem>
                 {array?.map(e => (
                    <MenuItem key={e.id} value={e.id}>
                        <Checkbox checked={state.indexOf(e.id) > -1 || state.indexOf(0) > -1}/>
                        <ListItemText primary={getProperty(e, property)}/>
                    </MenuItem>
                ))} 
            </Select>
        </FormControl>
    )
}
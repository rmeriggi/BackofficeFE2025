import React from 'react';
import { Formik, Form } from "formik"
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, MenuItem, TextField, colors } from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
 palette: {
  primary: colors.indigo,
 },
});
export const FilterByProductType = ({productsTypes}) => {

 return (
  <div className="bg-white">
   <Formik
    initialValues={{
      productTypeId: 0
    }}
    onSubmit={(values) => {
    }}
    >
    {({ handleSubmit, setFieldValue, values,isSubmitting}) => (
    <Form className="form-label-right"> 
     <div className="row align-items-center">
      <div className="col mr-2" style={{width: "200px"}}>
       <ThemeProvider theme={defaultMaterialTheme}>
        <TextField
          fullWidth
          select
          size="small"
          label="Tipo de producto"
          variant="outlined"
          value={values.productTypeId}
          onChange={(e) => {
            setFieldValue("productTypeId", e.target.value)
          }}
         >
          <MenuItem key={0} value={0}>
            Todas
          </MenuItem>
         {productsTypes.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
         ))}
        </TextField>
       </ThemeProvider >
      </div>
     </div>
    </Form>
   )}
  </Formik>
 </div>
 )
}
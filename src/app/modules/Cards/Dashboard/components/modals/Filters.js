import React from 'react';
import { Formik, Form } from "formik"
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, MenuItem, TextField, colors, Button, CircularProgress} from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
 palette: {
  primary: colors.indigo,
 },
});
export const Filters = ({productTypes}) => {

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
     <div className="row justify-content-center align-items-center">
      <div className="col-6">
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
         {productTypes.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
         ))}
        </TextField>
       </ThemeProvider >
      </div>
      <div className="col-4">                    
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={isSubmitting}
          onSubmit={() => 
            handleSubmit()                           
          }                           
          endIcon={
          isSubmitting && <CircularProgress size={20} color="secondary"/>  
          }    
          >
            Aplicar Filtros
        </Button>
      </div>
     </div>
    </Form>
   )}
  </Formik>
 </div>
 )
}
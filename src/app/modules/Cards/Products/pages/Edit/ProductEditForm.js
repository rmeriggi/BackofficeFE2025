import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { 
  Button,
  CircularProgress,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from '../../../../../hooks/useSnackBar';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    width: '15px !important',
    height: '15px !important',
  },
  submitContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  submitButton: {
    height: 35
  }
}));

const ProductEditSchema = Yup.object().shape({
  product: Yup.string()
  .required("Nombre del grupo es un campo requerido"),
});

export function ProductEditForm({product}) {

  const initialValues = {
    product: product.product,
    brand: product.brand,
    cardType: product.cardType,
    cashierExt: product.cashierExt,
    cashier: product.cashier,
    extractCashier: product.extractCashier,
    punitiveRate: product.punitiveRate,
    replacement: product.replacement,
    compensatoryRate: product.compensatoryRate,
    refinancing: product.refinancing,
    tem: product.tem,
    cft: product.cft,
    tna: product.tna,
    summary: product.summary,
    renewalCharge: product.renewalCharge,
    quotaLimit: product.quotaLimit,
    limit: product.limit,
    flota: product.flota,
    comision: product.comision,
  }

  const history = useHistory();

  const classes = useStyles();

  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  const [progress, setProgress] = useState(false);

  const handleEdit = async (values) => {
    try {
      //await edit(product.id, values);
      setOpenMessage('success', 'El producto fue actualizado correctamente.')
      setTimeout(()=>{
        history.push('/cards/products')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'El producto no pudo ser actualizado correctamente. Por favor, volvé a intentar.')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleEdit(values)
        }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-product row">
                <div className="col-lg-3">
                  <Field
                    name="product"
                    component={Input}
                    placeholder="Producto"
                    label="Producto"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="brand"
                    component={Input}
                    placeholder="Marca"
                    label="Marca"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="cardType"
                    component={Input}
                    placeholder="Tipo"
                    label="Tipo"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="comision"
                    component={Input}
                    placeholder="Comisión"
                    label="Comisión"
                  />
                </div>
              </div>
              <div className="form-product row">
                <div className="col-lg-3">
                  <Field
                    name="limit"
                    component={Input}
                    placeholder="Límite"
                    label="Límite"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="quotaLimit"
                    component={Input}
                    placeholder="Límite Cuotas"
                    label="Cuota Límite"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="renewalCharge"
                    component={Input}
                    placeholder="Cargo Renovación"
                    label="Cargo Renovación"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="summary"
                    component={Input}
                    placeholder="Resumen"
                    label="Resumen"
                  />
                </div>
              </div>
              <div className="form-product row">
                <div className="col-lg-3">
                  <Field
                    name="tna"
                    component={Input}
                    placeholder="TNA"
                    label="TNA"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="cft"
                    component={Input}
                    placeholder="CFT"
                    label="CFT"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="tem"
                    component={Input}
                    placeholder="TEM"
                    label="TEM"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="compensatoryRate"
                    component={Input}
                    placeholder="Tasa Compensatorios"
                    label="Tasa Compensatorios"
                  />
                </div>
              </div>
              <div className="form-product row">
                <div className="col-lg-3">
                  <Field
                    name="punitiveRate"
                    component={Input}
                    placeholder="Tasa Punitorios"
                    label="Tasa Punitorios"
                  />
                </div>     
                  <div className="col-lg-3">
                  <Field
                    name="replacement"
                    component={Input}
                    placeholder="Reposición"
                    label="Reposición"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="cashier"
                    component={Input}
                    placeholder="Cajero"
                    label="Cajero"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="cashierExt"
                    component={Input}
                    placeholder="CajeroExt"
                    label="CajeroExt"
                  />
                </div>
              </div>
              <div className="form-product row">
                             
              <div className="col-lg-3">
                    <FormControlLabel 
                      control={
                        <Switch 
                          checked={values.extractCashier === "1"? true : false} 
                          onChange={(e) => {
                            //setFieldValue("automaticApproval", e.target.checked === true? "1" : "0")
                          }} 
                        />} 
                      label="Extrae Cajero"
                      labelPlacement="top"                
                    />
                  </div>
                  <div className="col-lg-3">
                    <FormControlLabel 
                      control={
                        <Switch 
                          checked={values.refinancing === "1"? true : false} 
                          onChange={(e) => {
                            //setFieldValue("automaticApproval", e.target.checked === true? "1" : "0")
                          }} 
                        />} 
                      label="Refinanciación"
                      labelPlacement="top"                
                    />
                  </div>
                  <div className="col-lg-3">
                    <FormControlLabel 
                      control={
                        <Switch 
                          checked={values.flota === "1"? true : false} 
                          onChange={(e) => {
                            //setFieldValue("automaticApproval", e.target.checked === true? "1" : "0")
                          }} 
                        />} 
                      label="Flota"
                      labelPlacement="top"                
                    />
                  </div>
              </div>
              <div className={classes.submitContainer}>
                <Button 
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className="ml-4"
                  size="large"
                  onClick={handleSubmit}
                  endIcon={
                    isSubmitting && <CircularProgress size={20} color="secondary"/>  
                  }
                >
                  Editar
                </Button>
              </div>
              <SnackbarMessage
                handleClose={handleClose}
                open={open}
                variant={variant}
                message={message}
              />
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

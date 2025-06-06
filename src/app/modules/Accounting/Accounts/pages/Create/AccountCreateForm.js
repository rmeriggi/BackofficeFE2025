/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { 
  Button,
  MenuItem,
  CircularProgress,
  TextField
} from '@material-ui/core';
import { create } from "../../utils/service";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";

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

const AccountingCreateSchema = Yup.object().shape({
  account: Yup.string()
  .required("Nombre de la cuenta es un campo requerido"),
});

export function AccountCreateForm(props) {

  const history = useHistory();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El grupo fue cambiado correctamente.")
  const [progress, setProgress] = useState(false);
  
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleCreate = async (values) => {
    const body = {
      idGroup: values.group,
      account: values.account
    }
    try {
      await create(body);
      setVariant('success')
      setMessage('La cuenta fue actualizada correctamente.')
      setOpen(true)
      setTimeout(()=>{
        history.push('/accounting/accounts')  
      }, 4000)
    } catch  {
      setVariant('error')
      setMessage('La cuenta no pudo ser actualizada correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }
  
  const getEntity = (idGroup) => {
    const group = props.groups.find( g => g.id == idGroup)
    const entityId = group.entity
    return entityId
  }
  
  const getCurrency = (idGroup) => {
    const group = props.groups.find( g => g.id == idGroup)
    const currencyId = group.currency
    return currencyId
  }
  
  const initialValues = {
    account: '',
    group: 1,
    entity: getEntity(1),
    currency: getCurrency(1)
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AccountingCreateSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleCreate(values)
        }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form>
              <div className="form-group row" >
                <div className="col-lg-3">
                  <Field
                    name="account"
                    component={Input}
                    placeholder="Cuenta"
                    label="Cuenta"
                  />
                </div>
                <div className="col-lg-3 mt-8">
                  <TextField
                    fullWidth
                    color='secondary'
                    select
                    size="small"
                    label='Grupo'
                    variant="outlined"
                    value={values.group}
                    onChange={(e)=>{
                      handleChange(e);
                      setFieldValue('group', e.target.value)
                      setFieldValue('entity', getEntity(e.target.value))
                      setFieldValue('currency', getCurrency(e.target.value))
                    }}
                  >
                    {
                      props.groups.map((e)=>(
                        <MenuItem value={e.id} key={e.id}>{e.group}</MenuItem>
                      ))
                    }
                  </TextField>
                </div>
                <div className="col-lg-3 mt-8" >
                  <GeneralSelector 
                    disabled
                    values={values}
                    valueName='entity'
                    keyName='entity'
                    label='Entidad'
                    data={props.entities}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="col-lg-3 mt-8">
                  <GeneralSelector 
                    disabled
                    values={values}
                    valueName='currency'
                    keyName='currency'
                    label='Moneda'
                    data={props.currency}
                    setFieldValue={setFieldValue}
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
                  Crear
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

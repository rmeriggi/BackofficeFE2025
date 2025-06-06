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
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { getCurrencyId, getEntityId } from "../../components/getIdsFuntions";
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

const SubaccountEditSchema = Yup.object().shape({
  subAccount: Yup.string()
  .required("Nombre de la subcuenta es un campo requerido"),
});


export function SubaccountCreateForm(props) {

  const history = useHistory();
  const classes = useStyles();

  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
  const [progress, setProgress] = useState(false);
      
  const initialValues = {
    idAccount: 1,
    subAccount: '',
    idEntity: getCurrencyId(1, props.accounts, props.accountingGroups),
    idCurrency: getEntityId(1, props.accounts, props.accountingGroups)
  }

  const handleCreate = async (values) => {
    try {
      await create(values);
      setOpenMessage('success', 'La subcuenta fue creada correctamente.')
      setTimeout(()=>{
        history.push('/accounting/subAccounts')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'La subcuenta no pudo ser creada correctamente. Por favor, volvé a intentar.')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={SubaccountEditSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleCreate(values)
        }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-3">
                  <Field
                    name="subAccount"
                    component={Input}
                    placeholder="Subcuenta"
                    label="Subcuenta"
                  />
                </div>
                <div className="col-3 mt-8">
                  <TextField
                    fullWidth
                    color='secondary'
                    select
                    size="small"
                    label='Cuenta'
                    variant="outlined"
                    value={values.idAccount}
                    onChange={(e)=>{
                      handleChange(e);
                      setFieldValue('idAccount', e.target.value)
                        setFieldValue('idEntity', getEntityId(e.target.value, props.accounts, props.accountingGroups))
                        setFieldValue('idCurrency', getCurrencyId(e.target.value, props.accounts, props.accountingGroups))
                    }}
                  >
                    {
                      props.accounts.map((e)=>(
                        <MenuItem value={e.id} key={e.id}>{e.account}</MenuItem>
                      ))
                    }
                  </TextField>
                </div>
                <div className="col-3 mt-8">
                  <GeneralSelector 
                    values={values}
                    valueName='idEntity'
                    keyName='entity'
                    label='Entidad'
                    data={props.entities}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="col-3 mt-8">
                  <GeneralSelector 
                    values={values}
                    valueName='idCurrency'
                    keyName='currency'
                    label='Moneda'
                    data={props.currencies}
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
                  Agregar
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

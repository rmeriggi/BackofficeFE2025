import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { 
  Button,
  CircularProgress
} from '@material-ui/core';
import { create } from "../../utils/service";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
import { useFetchCombos } from "../../../../../hooks";

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

const AccountingGroupEditSchema = Yup.object().shape({
  group: Yup.string()
  .required("Nombre del grupo es un campo requerido"),
});

const initialValues = {
  group: '',
  entity: 1,
  currency: 1
}

export function AccountingGroupCreateForm() {

  const history = useHistory();
  const classes = useStyles();

  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities)
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El grupo fue creado correctamente.")
  const [progress, setProgress] = useState(false);
  
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleEdit = async (values) => {
    try {
      await create(values);
      setVariant('success')
      setMessage('El grupo fue creado correctamente.')
      setOpen(true)
      setTimeout(()=>{
        history.push('/accounting/accounting-groups')  
      }, 4000)
    } catch  {
      setVariant('error')
      setMessage('El grupo no pudo ser creado correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AccountingGroupEditSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleEdit(values)
        }}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="group"
                    component={Input}
                    placeholder="Grupo"
                    label="Grupo"
                  />
                </div>
                <div className="col-lg-4 mt-6">
                  <GeneralSelector 
                    values={values}
                    valueName='entity'
                    keyName='entity'
                    label='Entidad'
                    data={entities}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="col-lg-4 mt-6">
                  <GeneralSelector 
                    values={values}
                    valueName='currency'
                    keyName='currency'
                    label='Moneda'
                    data={currencies}
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

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
import { edit } from "../../utils/service";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { getCurrencyId, getEntityId } from "../../../Subaccounts/components/getIdsFuntions";
import { getAccountId } from "../../components/getIdsFuntions";
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

const AuxiliaryAccountsEditSchema = Yup.object().shape({
  auxiliary: Yup.string()
  .required("Nombre del grupo es un campo requerido"),
});


export function AuxiliaryAccountsEditForm(props) {

  const {auxiliaryAccount, accounts, groups, subaccounts} = props

  const initialValues = {
    auxiliary: auxiliaryAccount.auxiliary,
    entity: getEntityId(auxiliaryAccount.account, accounts, groups),
    currency: getCurrencyId(auxiliaryAccount.account, accounts, groups),
    subAccount: auxiliaryAccount.idSubAccount
  }

  const history = useHistory();

  const classes = useStyles();

  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities)
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
  const [progress, setProgress] = useState(false);

  const handleEdit = async (values) => {
    const body = {
      idSubAccount: values.subAccount,
      auxiliary: values.auxiliary
    }
    try {
      await edit(auxiliaryAccount.id, body);
      setOpenMessage('success', 'El grupo fue actualizado correctamente.')
      setTimeout(()=>{
        history.push('/accounting/auxiliary-accounts')  
      }, 4000)
    } catch  {
      setOpenMessage('error','El grupo no pudo ser actualizado correctamente. Por favor, volvé a intentar.')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AuxiliaryAccountsEditSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleEdit(values)
        }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form>
              <div className="form-group row"> 
                <div className="col-3">
                  <Field
                    name="auxiliary"
                    component={Input}
                    placeholder="Nombre"
                    label="Cambiar Nombre"
                  />
                </div>
                <div className="col-3 mt-8">
                  <TextField
                    fullWidth
                    color='secondary'
                    select
                    size="small"
                    label='Subcuenta'
                    variant="outlined"
                    value={values.subAccount}
                    onChange={(e)=>{
                      handleChange(e);
                      setFieldValue('subAccount', e.target.value)       
                      const newAaccountId = getAccountId(e.target.value, subaccounts)                 
                      setFieldValue('currency', getCurrencyId(newAaccountId, accounts, groups))
                      setFieldValue('entity', getEntityId(newAaccountId, accounts, groups))
                    }}
                  >
                    {
                      subaccounts.map((e)=>(
                        <MenuItem value={e.id} key={e.id}>{e.subAccount}</MenuItem>
                      ))
                    }
                  </TextField>
                </div>
                <div className="col-3 mt-8" >
                  <GeneralSelector 
                    disabled
                    values={values}
                    valueName='entity'
                    keyName='entity'
                    label='Entidad'
                    data={entities}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="col-3 mt-8">
                  <GeneralSelector 
                    disabled
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
                  Guardar
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

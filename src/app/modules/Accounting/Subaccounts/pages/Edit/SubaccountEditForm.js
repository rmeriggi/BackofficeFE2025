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
import { getCurrencyId, getEntityId } from "../../components/getIdsFuntions";
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

const SubaccountEditSchema = Yup.object().shape({
  subAccount: Yup.string()
  .required("Nombre de la subcuenta es un campo requerido"),
});

export function SubaccountEditForm({subAccount, accounts, accountingGroups}) {

  const initialValues = {
    idAccount: subAccount.account,
    subAccount: subAccount.subAccount,
    idEntity: getEntityId(subAccount.account, accounts, accountingGroups),
    idCurrency: getCurrencyId(subAccount.account, accounts, accountingGroups)
  }

  const history = useHistory();

  const classes = useStyles();

  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities)
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
  const [progress, setProgress] = useState(false);

  const handleEdit = async (values) => {
    const body = {
      idAccount:  values.idAccount,
      subAccount: values.subAccount
    }
    try {
      await edit(subAccount.id, body);
      setOpenMessage('success', 'La subcuenta fue actualizada correctamente.')
      setTimeout(()=>{
        history.push('/accounting/subAccounts')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'La subcuenta no pudo ser actualizada correctamente. Por favor, volvé a intentar.')
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
          handleEdit(values)
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
                      setFieldValue('idEntity', getEntityId(e.target.value, accounts, accountingGroups))
                      setFieldValue('idCurrency', getCurrencyId(e.target.value, accounts, accountingGroups))
                    }}
                  >
                    {
                      accounts.map((e)=>(
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
                    data={entities}
                    disabled
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="col-3 mt-8">
                  <GeneralSelector 
                    values={values}
                    valueName='idCurrency'
                    keyName='currency'
                    label='Moneda'
                    data={currencies}
                    disabled
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

import React, { useState, useEffect } from "react";
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
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { getAccountId } from "../../components/getIdsFuntions";
import { getAllSubaccounts } from "../../../Subaccounts/utils/service"
import { initialParamsAccounts, initialParamsGroups, initialParamsSubaccounts } from "../../../initialParams";
import { getCurrencyId, getEntityId } from "../../../Subaccounts/components/getIdsFuntions";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { getAllAccounts } from "../../../Accounts/utils/service";
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

const AuxiliaryAccountsCreateSchema = Yup.object().shape({
  auxiliary: Yup.string()
  .required("Nombre de la cuenta auxiliar es un campo requerido"),
});

export function AuxiliaryAccountsCreateForm() {

  const history = useHistory();
  const classes = useStyles();

  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities)
  const [groupsData, setGroups] = useState();
  const [accountsData, setAccounts] = useState();
  const [subAccountData, setSubaccountsData] = useState();
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
  const [progress, setProgress] = useState(false);
  
  useEffect (() => {
    const getGroups = async() => {
      const groups = await getAllAccountingGroup(initialParamsGroups)
      setGroups(groups)
    }
    getGroups();
  }, [])

  useEffect(() => {
    const getAccounts = async() => {
      const accounts = await getAllAccounts(initialParamsAccounts)
      setAccounts(accounts)
    }
    getAccounts()
  }, [])

  useEffect(()=>{
    const getData = async() => {
        const response = await getAllSubaccounts(initialParamsSubaccounts)
        setSubaccountsData(response)
    }
    getData()
}, [])

  if (!subAccountData) return <LayoutSplashScreen />
  
  const { accounts } = accountsData
  const { subAccounts } = subAccountData
  const { accountingGroups } = groupsData
      
  const initialValues = {
    auxiliary: '',
    idSubAccount: 1,
    account: getAccountId(1, subAccounts),
    entity: getEntityId(getAccountId(1, subAccounts), accounts, accountingGroups),
    currency: getCurrencyId(getAccountId(1, subAccounts), accounts, accountingGroups)
  }
  
  const handleEdit = async (values) => {
    try {
      await create( values);
      setOpenMessage('success', 'La cuenta auxiliar fue creada correctamente.')
      setTimeout(()=>{
        history.push('/accounting/auxiliary-accounts')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'La cuenta auxiliar ser creada correctamente. Por favor, volvé a intentar.')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AuxiliaryAccountsCreateSchema}
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
                    name="auxiliary"
                    component={Input}
                    placeholder="Cuenta Auxiliar"
                    label="Cuenta Auxiliar"
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
                    value={values.idSubAccount}
                    onChange={(e)=>{
                      handleChange(e);
                      setFieldValue('idSubAccount', e.target.value)
                      const newAaccountId = getAccountId(e.target.value, subAccounts)                 
                      setFieldValue('currency', getCurrencyId(newAaccountId, accounts, accountingGroups))
                      setFieldValue('entity', getEntityId(newAaccountId, accounts, accountingGroups))
                    }}
                  >
                    {
                      subAccounts.map((e)=>(
                        <MenuItem value={e.id} key={e.id}>{e.subAccount}</MenuItem>
                      ))
                    }
                  </TextField>
                </div>
                <div className="col-3 mt-8">
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

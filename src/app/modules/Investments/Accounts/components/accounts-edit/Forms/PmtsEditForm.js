import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { 
  Button,
  CircularProgress,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from '../../../../../../hooks/useSnackBar';
import { accountFields } from "../accountFields";



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
  accountName: Yup.string()
  .required("Nombre de la cuenta es un campo requerido"),
});

export function PmtsEditForm({account}) {

    const classes = useStyles();
    const history = useHistory()
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
    const [progress, setProgress] = useState(false);
  
    const initialValues = {
      pmtComSinCustodia: 1,
      pmtComRecepdeInf: 0,
    }

  const handleEdit = async (values) => {
    try {
      //await edit(accountingGroup.id, values);
      setOpenMessage('success', 'Los datos fueron actualizados correctamente.')
      setTimeout(()=>{
        history.push('/investments/accounts')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'Los datos no fueron actualizados correctamente. Por favor, volvé a intentar.')
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
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              {
                accountFields.pmts.map((af)=> {
                  return (
                    <div className="form-group row">
                      {
                        af.map((e) => {
                          return (
                            <div className="col-lg-3 d-flex justify-content-center text-center">
                              <FormControlLabel 
                                label={e.label}
                                labelPlacement="top"                
                                control={
                                  <Switch 
                                    checked={values[e.value] === 1} 
                                    onChange={(e) => {
                                      setFieldValue(`${e.value}`, e.target.checked === true? 1 : 0)
                                    }} 
                                  />
                                } 
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
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

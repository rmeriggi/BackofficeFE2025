/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { 
  FormControl,
  Button,
  Select, 
  MenuItem,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import {  editHeader } from "../../utils/service";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { ListingTableContextProvider } from "./ListingDetails/ListingTableContext";
import Listing from "./ListingDetails";

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
}));

const TemplatesEntriesSchema = Yup.object().shape({
  description: Yup.string()
  .required("Descripción es un campo requerido"),
});

export function TemplatesEntriesEditForm(props) {

  const templatesDetails = props.seatingTemplateDetail

  const initialValues = {
      idModule: props.seatingTemplateHeader.idModule,
      description: props.seatingTemplateHeader.description.trim(),
      seatingTemplateDetail: templatesDetails,
  }

  const history = useHistory();
  const classes = useStyles();
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
  const [progress, setProgress] = useState(false);

  
  const handleEdit = async (values) => {
    const bodyHeader = {
      idModule: values.idModule,
      description: values.description
    }

    try {
      await editHeader(props.seatingTemplateHeader.id, bodyHeader);
      setOpenMessage('success', 'La plantilla fue actualizada correctamente.')
      setTimeout(()=>{
        history.push('/accounting/templates-entries')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'La plantilla no pudo ser actualizada correctamente. Por favor, intenta nuevamente')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={TemplatesEntriesSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleEdit(values)
        }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form>
              <div className="form-group row"> 
                  <div className="col-lg-3 mt-5 mt-5">
                  <FormControl>
                    <InputLabel htmlFor="age-simple">Módulo</InputLabel>
                    <Select
                      value={values.idModule}
                      onChange={(e)=>{
                        handleChange(e);
                        setFieldValue('idModule', e.target.value)
                      }}
                      style={{width: '215px'}}
                    >
                      {props.modules.map((e)=>(
                          <MenuItem value={e.id} key={e.id}>{e.module}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-lg-3">
                  <Field
                    name="description"
                    component={Input}
                    placeholder="Descripción"
                    label="Descripción"
                  />
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
              </div>
              <ListingTableContextProvider>
                <Listing
                  data={templatesDetails} 
                  idHeader={props.seatingTemplateHeader.id}
                  accounts={props.accounts}
                  subAccounts={props.subAccounts}
                  auxiliariesAccounts={props.auxiliariesAccounts}
                  accountingGroups={props.accountingGroups}
                  show={props.show}
                  closeModal={props.closeModal}
                  openModal={props.openModal}
                  id={props.id}
                  loading={props.loading}
                  setLoading={props.setLoading}
                  showCreate={props.showCreate}
                  setShow={props.setShow}
                />
              </ListingTableContextProvider>
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

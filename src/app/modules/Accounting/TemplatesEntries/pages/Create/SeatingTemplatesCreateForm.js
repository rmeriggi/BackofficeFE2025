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
  CircularProgress,
} from '@material-ui/core';
import { createHeader } from "../../utils/service";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from "../../../../../hooks/useSnackBar";

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

const SeatingTemplatesCreateSchema = Yup.object().shape({
  description: Yup.string()
    .required("La descripción es un campo requerido"),
});

export function SeatingTemplatesCreateForm(props) { 

  const initialValues = {
      idModule: 1,
      description: '',
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
      createHeader(bodyHeader)
      setOpenMessage('success', 'La plantilla fue creada correctamente.')
      setTimeout(()=>{
        history.push('/accounting/templates-entries')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'La plantilla no pudo ser creada correctamente. Por favor, intenta nuevamente')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={SeatingTemplatesCreateSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleEdit(values)
        }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form>
              <div className="form-group row"> 
                <div className="col-lg-3 mt-5">
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


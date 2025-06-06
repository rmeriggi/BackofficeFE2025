/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { es } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, CircularProgress, colors, createMuiTheme } from '@material-ui/core';
import { setDatesValues } from '../../../../../utils/validationDates';
import { getMayorVista } from '../../../../../_redux/accounting/accountingCrud';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const initialValues = {
  currency: 0,
  entities: 0,
  idAuxiliary: 1,
  fromDate: new Date(),
  toDate: new Date(),
  country: 1
};

const today = new Date();
const tomorrow = today.setDate(today.getDate() + 1);

export const FiltersModal = ({
  show, 
  onHide, 
  entities, 
  currencies, 
  setMayorBookData, 
  accountsAux, 
  enableLoading, 
  disableLoading, 
  countries,
  paramsAuxAccounts,
  setParamsAuxAccounts,
  loadingSelect
}) => {

  const [initial, setInitial] = useState(initialValues);

  const getMayorBookList = async(values) => {
    const req = {
      idEntity: values.entities,
      idCurrency: values.currency,
      fromDate: values.fromDate.toISOString(),
      toDate: values.toDate.toISOString(),
      idAuxiliary: values.idAuxiliary,
      country: values.country,
      id_client: 1
    };

    try {
      const responseAccountAux = await getMayorVista(req);
      setMayorBookData(responseAccountAux);
      disableLoading();
      onHide();
    } catch (e) {
      setMayorBookData([]);
      disableLoading();
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Filtros
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        <Formik
          initialValues={initial}
          onSubmit={(values) => {
            enableLoading();
            return getMayorBookList(values);
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting, values}) => (
            <Form className="form form-label-right">
              <div className="row align-items-center width-100 wrap mt-5">
                <div className="col-3 text-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <KeyboardDatePicker
                        autoOk
                        fullWidth
                        size="small"
                        disableFuture
                        inputVariant="outlined"
                        label="Fecha desde"
                        format="dd/MM/yyyy"
                        value={values.fromDate}
                        cancelLabel="cancelar"
                        onChange={date => {
                          if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                            setDatesValues(date, values.toDate, setFieldValue, "from");
                            setInitial({
                              ...initial,
                              fromDate : date
                            });
                          }
                        }}
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-3 text-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <KeyboardDatePicker
                        autoOk
                        fullWidth
                        size="small"
                        disableFuture
                        inputVariant="outlined"
                        label="Fecha hasta"
                        format="dd/MM/yyyy"
                        value={values.toDate}
                        cancelLabel="cancelar"
                        onChange={date =>{
                          if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                            setDatesValues(date, values.fromDate, setFieldValue, "to");
                            setInitial({
                              ...initial,
                              toDate : date
                            });
                          }
                        }}
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
                <div className="ml-auto">
                  <Button
                    type='submit'
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting || loadingSelect}
                    onSubmit={handleSubmit}                           
                    endIcon={
                      isSubmitting && <CircularProgress size={20} color="secondary"/>  
                    }    
                  >
                    Aplicar Filtros
                  </Button>
                </div>                 
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

import React, { useState } from 'react';
import { es } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, CircularProgress, colors, createMuiTheme } from '@material-ui/core';
import { getMayorSaldosVista } from '../../utils/api';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const initialValues = {
  date: new Date(),
};

export const FiltersLedgerBalance = ({ show, onHide, setMayorSaldosData, enableLoading, disableLoading }) => {
  const [initial, setInitial] = useState(initialValues);

  const getMayorSaldosList = async (values) => {
    const req = { date: values.date };
    try {
      const response = await getMayorSaldosVista(req);
      setMayorSaldosData(response.mayor_saldos || []);
      disableLoading();
      onHide();
    } catch (e) {
      setMayorSaldosData([]);
      disableLoading();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Filtros</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initial}
          onSubmit={(values) => {
            enableLoading();
            getMayorSaldosList(values);
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
            <Form className="form">
              <div className="row mt-5">
                <div className="col-3">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <KeyboardDatePicker
                        autoOk
                        fullWidth
                        disableFuture
                        inputVariant="outlined"
                        label="Fecha"
                        format="dd/MM/yyyy"
                        value={values.date}
                        onChange={(date) => setFieldValue('date', date)}
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
                <div className="ml-auto">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                    endIcon={isSubmitting && <CircularProgress size={20} color="secondary" />}
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
};

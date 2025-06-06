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
import { getVatPurchasesVista } from '../../../../../_redux/accounting/accountingCrud';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const initialValues = {
  month: 8,
  year: 2023,
};

export const FiltersModal = ({
  show,
  onHide,
  setVatPurchasesData,
  enableLoading,
  disableLoading,
}) => {
  const [initial, setInitial] = useState(initialValues);

  const getVatPurchasesList = async (values) => {
    const req = {
      month: values.month,
      year: values.year,
    };

    try {
      const response = await getVatPurchasesVista(req);
      setVatPurchasesData(response);
      disableLoading();
      onHide();
    } catch (e) {
      setVatPurchasesData([]);
      disableLoading();
    }
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg" size="xl">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Filtros</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        <Formik
          initialValues={initial}
          onSubmit={(values) => {
            enableLoading();
            return getVatPurchasesList(values);
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
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
                        label="Mes"
                        format="MM/yyyy"
                        views={['year', 'month']}
                        value={values.month}
                        cancelLabel="cancelar"
                        onChange={(date) => {
                          setFieldValue('month', date.getMonth() + 1);
                          setFieldValue('year', date.getFullYear());
                          setInitial({ ...initial, month: date.getMonth() + 1, year: date.getFullYear() });
                        }}
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

import React, { useState } from 'react';
import { es } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, CircularProgress, colors, createMuiTheme } from '@material-ui/core';
import { getMayorSaldosVista, getMayorSaldosPdf } from '../../utils/api';
import * as XLSX from 'xlsx';  

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const initialValues = {
  date: new Date(),
};

const ListingFilter = ({ show, onHide, setMayorSaldosData, enableLoading, disableLoading }) => {
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

  const handleDownloadReport = async () => {
    try {
      const response = await getMayorSaldosPdf({ date: initial.date });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mayor_saldos_report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the report', error);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(setMayorSaldosData); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mayor de Saldos');

    XLSX.writeFile(workbook, 'Mayor_de_Saldos.xlsx'); 
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
                        onChange={(date) => {
                          setFieldValue('date', date);
                          setInitial({ date });
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownloadReport}
                    className="ml-3"
                  >
                    Descargar PDF
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownloadExcel}
                    className="ml-3"
                  >
                    Descargar Excel
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

export default ListingFilter;

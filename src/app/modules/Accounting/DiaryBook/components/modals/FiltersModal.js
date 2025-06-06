/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { es } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, CircularProgress, colors, createMuiTheme, MenuItem, TextField } from '@material-ui/core';
import { setDatesValues } from '../../../../../utils/validationDates';
import { Autocomplete } from '@material-ui/lab';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';
import { getDiaryBooksVista } from '../../../../../_redux/accounting/accountingCrud';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const initialValues = {
  currency: 0,
  idEntity: 0,
  idAuxiliary: 1,
  fromDate: new Date(),
  toDate: new Date(),
  country: 1,
  id_client: 1
}

export const FiltersModal = ({
  show, 
  onHide, 
  entities, 
  currencies, 
  setDiaryBookData, 
  accountsAux, 
  enableLoading, 
  disableLoading, 
  countries,
  paramsAuxAccounts,
  setParamsAuxAccounts,
  loadingSelect
}) => {
  
  const [initial, setInitial] = useState(initialValues)

  const getDiaryBookList = async(values) => {
    const req = {
      idEntity: initial.idEntity,
      idCurrency: initial.currency,
      fromDate: initial.fromDate.toISOString(),
      toDate: initial.toDate.toISOString(),
      idAuxiliary: initial.idAuxiliary,
      country: initial.country,
      id_client: 1
    }

    try {
      const response = await getDiaryBooksVista(req)
      setDiaryBookData(response)
      disableLoading()
      onHide()
    } catch (e) {
      setDiaryBookData([])
      disableLoading()
    }
  }

  const today = new Date()
  const tomorrow = today.setDate(today.getDate() + 1)
  
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
        {/*begin::Loading*/}
        {false ? (
          <>
            <div className="overlay-layer">
              <div className="spinner spinner-lg spinner-primary" />
            </div> 
          </>
        ) : (
         <>
           <Formik
            initialValues={initial}
            onSubmit={(values) => {
              enableLoading()
              return getDiaryBookList(values)
            }}
            >
            {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
            <Form className="form form-label-right"> 
              <div className="row align-items-center width-100 wrap">
                <div className="col">
                  <GeneralSelector 
                    values={initial}
                    valueName='entities'
                    keyName='idEntity'
                    label='Entidad'
                    data={entities}
                    setFieldValue={setFieldValue}
                    insideOnchange={(e) => {
                      setInitial({
                        ...initial,
                        entities: e.target.value
                      })
                      setParamsAuxAccounts({
                        ...paramsAuxAccounts,
                        idEntity: e.target.value
                      })
                    }}
                    extraMenuItem={
                      <MenuItem key={0} value={0}>
                        Todas
                      </MenuItem>
                    }
                  />
                </div>
            
                <div className="col">
                  <GeneralSelector 
                    values={initial}
                    valueName='currency'
                    keyName='currency'
                    label='Moneda'
                    data={currencies}
                    setFieldValue={setFieldValue}
                    insideOnchange={(e) => {
                      setInitial({
                        ...initial,
                        currency: e.target.value
                      })
                      setParamsAuxAccounts({
                        ...paramsAuxAccounts,
                        idCurrency: e.target.value
                      })
                    }}
                    extraMenuItem={
                      <MenuItem key={0} value={0}>
                        Todas
                      </MenuItem>
                    }
                  />
                </div>
                <div className="col">
                  <GeneralSelector 
                    values={initial}
                    valueName='country'
                    keyName='country'
                    label='País'
                    data={countries}
                    setFieldValue={setFieldValue}
                    insideOnchange={(e) => {
                      setInitial({
                        ...initial,
                        country: e.target.value
                      })
                      setParamsAuxAccounts({
                        ...paramsAuxAccounts,
                        country: e.target.value
                      })
                    }}
                    extraMenuItem={
                      <MenuItem key={0} value={0}>
                        Todas
                      </MenuItem>
                    }
                  />
                </div>
                <div className="col">
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <Autocomplete
                      value={initial.idAuxiliary}
                      disabled={loadingSelect}
                      disablePortal
                      size="small"
                      name="idAuxiliary"
                      options={accountsAux || []}  
                      getOptionLabel={option => {
                        const account = accountsAux?.find(a => option === a.id || option.id === a.id);
                        const accountName = account?.auxiliary?.trim() || "";
                        const accountId = account?.id || "";
                        return `${accountName} - ${accountId}`;
                      }}
                      getOptionSelected={(option, value) => option?.id === value?.id}
                      onChange={(e, newValue) => {
                          setFieldValue("idAuxiliary", newValue !== null ? newValue.id : "")
                          setParamsAuxAccounts({
                            ...paramsAuxAccounts,
                            idAuxiliary: newValue !== null ? newValue.id : ""
                          })
                      }}
                      renderInput={(params) =>                  
                        <TextField {...params}
                          variant="outlined"
                          label="Cuenta auxiliar"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loadingSelect ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      }
                    />
                  </ThemeProvider>
                </div>
              </div>
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
                        if (date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow) {
                          setDatesValues(date, values.toDate, setFieldValue, "from")
                          setInitial({
                            ...initial,
                            fromDate: date
                          })
                          setParamsAuxAccounts({
                            ...paramsAuxAccounts,
                            fromDate: date
                          })
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
                          if (date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow) {
                            setDatesValues(date, values.fromDate, setFieldValue, "to")
                            setInitial({
                              ...initial,
                              toDate: date
                            })
                            setParamsAuxAccounts({
                              ...paramsAuxAccounts,
                              toDate: date
                            })
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
        </>
        )}
      </Modal.Body>
    </Modal>
  );
}

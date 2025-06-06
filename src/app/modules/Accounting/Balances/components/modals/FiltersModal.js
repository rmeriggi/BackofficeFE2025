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
import { getBalancesListData } from '../../utils/service';
import { balancesAdapter } from '../../adapters/balancesAdapters';
import { Autocomplete } from '@material-ui/lab';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const initialValues = {
  currency: 0,
  entities: 0,
  fromIdAuxiliary: 1,
  toIdAuxiliary: 1,
  fromDate: new Date(),
  toDate: new Date()
}

export const FiltersModal = ({
  show, 
  onHide, 
  entities, 
  currencies, 
  setBalancesData, 
  accountsAux, 
  enableLoading, 
  disableLoading,
  paramsAuxAccounts,
  setParamsAuxAccounts,
  loadingSelect
}) => {

  const [initial, setInitial] = useState(initialValues)

  const getBalancesList = async(values) => {
    const req = {
      idEntity:        values.entities,
      idCurrency:      values.currency,
      fromDate:        values.fromDate.toISOString(),
      toDate:          values.toDate.toISOString(),
      fromIdAuxiliary: values.fromIdAuxiliary,
      toIdAuxiliary:   values.toIdAuxiliary
    }

    try {
      const response = await getBalancesListData(req)
      const formattedData = response.map((r) => {
        const idCurrency = currencies.find(c => c.id == r.idCurrency)?.currency || "Sin datos"
        const idEntity   = entities.find(e => e.id == r.idEntity)?.entity || "Sin datos"
        return {
          ...r,
          idCurrency,
          idEntity
        }
      })
      const balancesList = balancesAdapter(formattedData)
      setBalancesData(balancesList)
      disableLoading()
      onHide()
    } catch (e) {
      setBalancesData({total: "", balances: []})
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
          {/*end::Loading*/}
          </>
        ) : (
         <>
           <Formik
            initialValues={initial}
            onSubmit={(values) => {
              enableLoading()
              return getBalancesList(values)
            }}
            >
            {({ handleSubmit, setFieldValue, isSubmitting, values}) => (
            <Form className="form form-label-right"> 
            <div className="row align-items-center width-100 wrap">
              <div className="col">
                <GeneralSelector 
                  values={initial}
                  valueName='entities'
                  keyName='entity'
                  label='Entidad'
                  data={entities}
                  setFieldValue={setFieldValue}
                  insideOnchange={(e) => {
                    setInitial({
                      ...initial,
                      entities : e.target.value
                    })
                    setParamsAuxAccounts({
                      ...paramsAuxAccounts,
                      idEntity: e.target.value
                    })
                  }}
                  extraMenuItem= {
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
                      currency : e.target.value
                    })
                    setParamsAuxAccounts({
                      ...paramsAuxAccounts,
                      idCurrency: e.target.value
                    })
                  }}
                  extraMenuItem= {
                  <MenuItem key={0} value={0}>
                    Todas
                  </MenuItem>
                  }
                />
              </div>
              <div className="col text-center">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      size="small"
                      disableFuture
                      inputVariant="outlined"
                      label="Fecha desde"
                      format="dd/MM/yyyy"
                      value={values.fromDate}
                      cancelLabel="cancelar"
                      onChange={date => {
                        if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                          setDatesValues(date, values.toDate, setFieldValue, "from")
                          setInitial({
                            ...initial,
                            fromDate : date
                          })
                        }
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              <div className="col text-center">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      size="small"
                      disableFuture
                      inputVariant="outlined"
                      label="Fecha hasta"
                      format="dd/MM/yyyy"
                      value={values.toDate}
                      cancelLabel="cancelar"
                      onChange={date =>{
                        if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                          setDatesValues(date, values.fromDate, setFieldValue, "to")
                          setInitial({
                            ...initial,
                            toDate : date
                          })
                        }
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              </div>
              <div className="row mt-5 align-items-center">   
                <div className="col-3">
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <Autocomplete
                      disabled={loadingSelect}
                      value={initial.fromIdAuxiliary}
                      disablePortal
                      size="small"
                      name="fromIdAuxiliary"
                      options={accountsAux}
                      getOptionLabel={option => accountsAux.find(a => option === a.id || option.id === a.id)?.auxiliary.trim() || ""}
                      getOptionSelected={(option, value) => option.id === value}
                      onChange={(e,newValue) => {
                          setFieldValue("fromIdAuxiliary", newValue !== null ?  newValue.id : "")
                          setInitial({
                            ...initial,
                            fromIdAuxiliary: newValue !== null ?  newValue.id : ""
                          })
                      }}
                      renderInput={(params) =>                  
                        <TextField {...params}
                          variant="outlined"
                          label="Desde cuenta auxiliar"
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
                <div className="col-3">
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <Autocomplete
                      disabled={loadingSelect}
                      value={initial.toIdAuxiliary}
                      size="small"
                      options={accountsAux}
                      getOptionLabel={option => accountsAux.find(a => option === a.id || option.id === a.id)?.auxiliary.trim() || ""}
                      getOptionSelected={(option, value) => option.id === value}
                      onChange={(e,newValue) => {
                          setFieldValue("toIdAuxiliary", newValue !== null ?  newValue.id : "")
                          setInitial({
                            ...initial,
                            toIdAuxiliary: newValue !== null ?  newValue.id : ""
                          })
                      }}
                      renderInput={(params) =>                  
                        <TextField {...params}
                          variant="outlined"
                          label="Hasta cuenta auxiliar"
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

import React, { useState } from 'react'
import { es } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import useIsMountedRef from  "../../../../../hooks/useIsMountedRef";
import { getListCollection } from "../../utils/service"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, CircularProgress, colors, createMuiTheme, MenuItem, TextField } from '@material-ui/core';
import { collectionsAdapter } from '../../adapters/collectionsAdapter';
import { useChannels } from '../../../../Credits/Collections/utils/apiHook';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const initialValues = {
  currency: 0,
  entity: 0,
  fromDate: new Date(),
  toDate: new Date(),
  idModule: 0,
  idProduct: 0,
  idPaymentChannel: 0,
}

export const FiltersModal = ({show, onHide, entities, currencies, setCollections, enableLoading, disableLoading, channels}) => {

  const [initial, setInitial] = useState(initialValues)
 
  const getList = async(values) => {
    enableLoading()
    try {
      const req = {
        idEntity:         values.entity,
        idCurrency:       values.currency,
        idModule:         values.idModule,
        idProduct:        values.idProduct,
        idPaymentChannel: values.idPaymentChannel,
        fromDate:         values.fromDate.toISOString(),
        toDate:           values.toDate.toISOString()
      }
      const response = await getListCollection(req)
      const listFormatted = collectionsAdapter(response)
      setCollections(listFormatted)
      disableLoading()
      onHide()
    } catch (error) {
      setCollections([])
      disableLoading()
    }
    
  }

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
              return getList(values)
            }}
            >
            {({ handleSubmit, setFieldValue, isSubmitting}) => (
            <Form className="form-label-right"> 
            <div className="row justify-content-center align-items-center width-100 wrap">
              <div className="col">
                <ThemeProvider theme={defaultMaterialTheme}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Entidad"
                    variant="outlined"
                    value={initial.entity}
                    onChange={(e) => {
                      setFieldValue("entity", e.target.value)
                      setInitial({
                        ...initial,
                        entity : e.target.value
                      })
                    }}
                  >
                    <MenuItem key={0} value={0}>
                      Todas
                    </MenuItem>
                  {entities.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.entity}
                    </MenuItem>
                  ))}
                  </TextField>
                </ThemeProvider >
              </div>
              <div className="col">
                <ThemeProvider theme={defaultMaterialTheme}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Moneda"
                    variant="outlined"
                    value={initial.currency}
                    onChange={(e) => {
                      setFieldValue("currency", e.target.value)
                      setInitial({
                        ...initial,
                        currency : e.target.value
                      })
                    }}
                  >
                    <MenuItem key={0} value={0}>
                      Todas
                    </MenuItem>
                  {currencies.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.currency}
                    </MenuItem>
                  ))}
                  </TextField>
                </ThemeProvider >
              </div>
              <div className="col">
                <ThemeProvider theme={defaultMaterialTheme}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Canal de Cobro"
                    variant="outlined"
                    value={initial.idPaymentChannel}
                    onChange={(e) => {
                      setFieldValue("idPaymentChannel", e.target.value)
                      setInitial({
                        ...initial,
                        idPaymentChannel : e.target.value
                      })
                    }}
                  >
                    <MenuItem key={0} value={0}>
                      Todas
                    </MenuItem>
                  {channels.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.channel}
                    </MenuItem>
                  ))}
                  </TextField>
                </ThemeProvider >
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
                      value={initial.fromDate}
                      cancelLabel="cancelar"
                      onChange={date => {
                        setFieldValue("fromDate",date)
                        setInitial({
                          ...initial,
                          fromDate : date
                        })
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
                      value={initial.toDate}
                      cancelLabel="cancelar"
                      onChange={date =>{
                        setFieldValue("toDate",date)
                        setInitial({
                          ...initial,
                          toDate : date
                        })
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              </div>
              <div className="row justify-content-end mt-2 pr-3">                    
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                  onSubmit={() => 
                    handleSubmit()                           
                  }                           
                  endIcon={
                    isSubmitting && <CircularProgress size={20} color="secondary"/>  
                  }    
                  >
                    Buscar
                </Button>
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

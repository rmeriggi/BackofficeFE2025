/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { getExcel } from '../../../../../utils/exportExcel';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { getListCollection } from "../../utils/service"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, CircularProgress, colors, createMuiTheme, MenuItem, TextField } from '@material-ui/core';
import { es } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import { collectionsAdapter } from '../../adapters/collectionsAdapter';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';

var sumTotal =0

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
  

const ListingFilter = ({dataTable, entities, currencies, setCollections, disableLoading, enableLoading, channels}) => {
    
    const propertiesData = {
        header: ['Entidad', 'Moneda', "Fecha Proceso", "Canal de cobro", "Tipo de movimiento", "Crédito", "N° de Cuota", "Importe",  "Fecha TRX","Gestor", "N° de Transacción", "Usuario", "Referencia", "ID Cliente", "DNI", "Apellido", "Nombre", "Ciudad", "CP", "Product","Canal", "Vencimiento", "Cant. Cuota", "Estado", "Gestor", "Lote", "idMigra", "ID Asiento", "ID Origen", "Capital", "Intereses", "Gastos", "IVA Gastos","Punitorios", "IVA Punitorios", "Otros", "IVA Otros", "Nro. Terminal"],
        properties:['entity', 'currency', "movementDate", "paymentChanel", "movementType", "id", "quota", "amount", "valueDate","user", "transactionNumber", "user", "reference", "idClient","passport","surname","name","city","postalCode","product","colectionChannel", "dueDate", "quotaAmount", "status", "manager","lote", "idMigra", "idSeat", "idOrigin","capital", "interest", "expenses", "ivaExpenses", "punitives", "ivaPunitives", "others", "ivaOthers", "terminalNumber"],
        array: dataTable,
    }

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

      if(response.length>0) {
        sumTotal = 0;

        for(let i=0;i<response.length;i++){
        
            sumTotal+=Number(response[i].amount)
         
          }          
      }
      if(!response) 
      {
        sumTotal = 0;
      }  
        
    } catch (error) {
      setCollections([])
      disableLoading()
    }
}

    return (
      <>
           <Formik
            initialValues={initial}
            onSubmit={(values) => {
                sumTotal = 0;
              return getList(values)
              
            }}
            >
            {({ handleSubmit, setFieldValue, isSubmitting}) => (
            <Form className="form-label-right"> 
            <div className="form form-label-right d-flex align-items-end" style={{paddingTop:"10px"}}>
              <div className="col">
                <GeneralSelector 
                  values={initial}
                  valueName='entity'
                  keyName='entity'
                  label='Entidad'
                  data={entities}
                  setFieldValue={setFieldValue}
                  insideOnchange={(e) => {
                    setInitial({
                      ...initial,
                      entity : e.target.value
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
                      currency : e.target.value
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
              <div className="col text-center">                    
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
            
              </div>
             </Form>
          )}
          </Formik>
            {
            dataTable.length > 0 ? 
                <div 
                    className="symbol-label ml-3" 
                    onClick={() => getExcel(propertiesData, "Cobranzas")}
                >
                    <i className="flaticon2-download icon-xl text-primary" role="button"></i>
                </div>
                :
                <div className="symbol-label ml-7">
                    <i className="flaticon2-download icon-xl text-secondary"></i>
                </div>
            }
            <h4 style={{paddingTop:"10px"}}> Total:  ${Math.floor(sumTotal)}</h4>
      </>
    );
}

export default ListingFilter
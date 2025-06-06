import React from 'react';
import DateFnsUtils from '@date-io/date-fns'
import propTypes from 'prop-types';
import { es } from 'date-fns/locale';
import { Formik } from "formik";
import { ThemeProvider } from '@material-ui/styles';
import { getScreenTitleToExcel } from '../../../../../utils/getTitle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { colors, createMuiTheme, Button, CircularProgress } from '@material-ui/core';
import {setDatesValues} from '../../../../../utils/validationDates'
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';
import { getCurrencies, getEntities } from '../../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../../hooks';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
  });
 
const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)


const ListingFilter = ({setValues, isSubmitting, setNameExcel, handleFilterModalClose}) => {

    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [entities] = useFetchCombos('entities', getEntities)

    const filterDate = (values) => {
        getScreenTitleToExcel("Saldos", setNameExcel, values)
        setValues({
            idCurrency: values.idCurrency, 
            fromDate : values.fromDate.toISOString(),
            toDate : values.toDate.toISOString(),
            idEntity: values.idEntity
        })
        setTimeout(() => {
            handleFilterModalClose()
        }, 1000);
    }

    return (
        <> 
            <Formik
                initialValues={{
                    fromDate: new Date(),
                    toDate: new Date(),
                    idCurrency: "2",
                    idEntity: entities?.[0].id || 1
                }}
                onSubmit={(values) => {
                    filterDate(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                        <div className="row justify-content-end">
                            <div className='col-3'>
                                <GeneralSelector 
                                    values={values}
                                    valueName='idCurrency'
                                    keyName='currency'
                                    label='Moneda'
                                    data={currencies}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                            <div className='col-3'>
                                <GeneralSelector 
                                    values={values}
                                    valueName='idEntity'
                                    keyName='entity'
                                    label='Entidad'
                                    data={entities}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                            <div className="col-3">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                        <KeyboardDatePicker
                                        autoOk
                                        disableFuture
                                        fullWidth
                                        size="small"
                                        inputVariant="outlined"
                                        label="Fecha Desde"
                                        format="dd/MM/yyyy"
                                        value={values.fromDate}
                                        cancelLabel="cancelar"
                                        onChange={date => {
                                            if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                                                setDatesValues(date, values.toDate, setFieldValue, "from")
                                            }
                                        }}
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-3">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                        <KeyboardDatePicker
                                        autoOk
                                        disableFuture
                                        fullWidth
                                        size="small"
                                        inputVariant="outlined"
                                        label="Fecha Hasta"
                                        format="dd/MM/yyyy"
                                        value={values.toDate}
                                        cancelLabel="cancelar"
                                        onChange={date => {
                                            if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                                                setDatesValues(date, values.fromDate, setFieldValue, "to")
                                            }
                                        }}
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className="ml-4"
                            size="large"
                            disabled={isSubmitting}
                            onSubmit={() => handleSubmit()}
                            endIcon={
                            isSubmitting && <CircularProgress size={20} color="secondary"/>  
                            }
                        >
                            Buscar
                        </Button>
                    </form>
                )}
            </Formik>
            {/*balancesData?.balances?.length > 0 ? 
            (
            <div className="symbol-label ml-7 mt-2" onClick={() => getExcel(propertiesData,nameExcel)}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-7 mt-2">
                <i className="flaticon2-download icon-xl text-secondary"></i>
            </div>
            )*/}
        </>
    );
}

ListingFilter.defaultProps = {
    disabled: false,
}

ListingFilter.propTypes = {
    disabled: propTypes.bool
}

export default ListingFilter;
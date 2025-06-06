import React, { useState } from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { es } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { getAllCreditsList, get } from '../../utils/service';
import { ThemeProvider } from '@material-ui/styles';
import { Button, CircularProgress, colors, createMuiTheme } from '@material-ui/core';
import { getExcel } from '../../../../../utils/exportExcel';
import {useListingTableContext} from "./ListingTableContext";
import { Select } from '../../../../../../_metronic/_partials/controls';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const { searchId } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.productName = searchText;
    filter.id = searchId
    filter.originalId = searchId
    newQueryParams.filter = filter;
    return newQueryParams;
};

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
  });

const ListingFilter = ({disabled, creditsData, setAllCredits,setLoading, creditsStatus, setRequest}) => {
    
    const {
        queryParams,
        setQueryParams,
        setPageNumber
    } = useListingTableContext();
    

    async function getProductsCredits(values) {
        setRequest({
            status: values.status,
            fromDate: values.fromDate.toISOString(),
            toDate: values.toDate.toISOString()
        })
        if(Number(idValue)>0){
            const response = await get(idValue)      
            setAllCredits([response.credit])
            setLoading(false)
        }
        else{
            const req = {
                status: values.status,
                fromDate: values.fromDate.toISOString(),
                toDate:values.toDate.toISOString()
            }
            const response = await getAllCreditsList(req)
            setAllCredits(response)
            setLoading(false)
        }
        
    }

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    const propertiesData = {
        header: ['Estado','ID', "ID Original", "ID Original", 'Producto', 'Fecha alta', "Tasa", "Capital", "CFT", "ID Producto", "Punitorios", "TNA", "ID Entidad", "Entidad", "Monto", "Nombre", "Apellido", "DNI","Email", "CFT", "ID Producto", "Punitorios", "TNA", "ID Entidad", "Entidad", "Monto", "Nombre", "Apellido", "DNI","Email"],
        properties:['status', 'id', "originalId", "originalId", 'productName', "date", "rate", "amount", "cft", "productId", "punitives", "rate", "idEntity", "entity", "total", "name", "surname", "dni","email", "cft", "productId", "punitives", "rate", "idEntity", "entity", "total", "name", "surname", "dni","email"],
        array: creditsData,
    }

    const [idValue, setIdValue] = useState();

    let fechaNueva = new Date()

    if(idValue > 0)
    {
        document.getElementById('fromDate').value = fechaNueva.setDate(fechaNueva.getDate() - 7)
        
    }

    

    return (
        <> <form className="form form-label-right d-flex align-items-end"> 
        <Formik
                    initialValues={{
                        searchText: "",
                        searchId: "",
                    }}
                    onSubmit={(values) => {
                        applyFilter(values);
                        
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                        handleBlur,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                            <div className="form group row" style={{widht:'auto'}}> 
                                    <div  style={{width:'45%'}}>                            
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="searchId"
                                                placeholder="Buscar por ID"
                                                onBlur={handleBlur}
                                                value={values.searchId}
                                                onChange={(e) => {
                                                    setFieldValue("searchId", e.target.value);
                                                    setIdValue(e.target.value)
                                                    handleSubmit();
                                                }}
                                            />                                
                                    </div>
                                    <div style={{width:'45%', marginLeft:'5px'}}>                                        
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="searchText"
                                                placeholder="Buscar Producto"
                                                onBlur={handleBlur}
                                                value={values.searchText}
                                                onChange={(e) => {
                                                    setFieldValue("searchText", e.target.value);
                                                    handleSubmit();
                                                }}
                                            />                                   
                                    </div>
                            </div>
                        </form>
                    )}
              
                </Formik>

                <Formik
                    initialValues={{
                        status: "0",
                        fromDate: fechaNueva,
                        toDate: new Date()
                    }}
                    onSubmit={(values) => {
                        setLoading(true)
                        return getProductsCredits(values)
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        setFieldValue,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                            <div className="form group row">
                                <div className="col-4 " style={{paddingTop:'12px'}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <KeyboardDatePicker
                                            autoOk
                                            size="small"                                            
                                            disabled={idValue}
                                            id='fromDate'
                                            inputVariant="outlined"
                                            label="Fecha desde"
                                            format="dd/MM/yyyy"
                                            value={values.fromDate}
                                            cancelLabel="cancelar"
                                            onChange={date => {                                                                                     
                                                 setFieldValue("fromDate",date)}                                             
                                        }
                                        />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-4 " style={{paddingTop:'12px'}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <KeyboardDatePicker
                                            autoOk
                                            size="small"
                                            disableFuture
                                            disabled={idValue}
                                            inputVariant="outlined"
                                            label="Fecha hasta"
                                            format="dd/MM/yyyy"
                                            value={values.toDate}
                                            cancelLabel="cancelar"
                                            onChange={date => setFieldValue("toDate",date)}
                                        />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div style={{width:'115px', paddingRight:'10px', paddingTop:'5px'}}>
                                    <Select
                                        name="status"
                                        value={values.status}
                                        disabled={idValue}
                                        onChange={(e)=>{
                                            setFieldValue('status', e.target.value)
                                        }}
                                        >
                                            <option key={0} value={0}>
                                                Todos
                                            </option>
                                        {creditsStatus.map((f)=>(
                                            <option key={f.id} value={f.id}>
                                                {f.status.trim()}
                                            </option>
                                        ))}
                                    </Select>
                                </div>                                
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        className="ml-5 align-self-center"
                                        size="small"
                                        disabled={isSubmitting}
                                        onSubmit={() => handleSubmit()}
                                        endIcon={
                                            isSubmitting && <CircularProgress size={15} color="secondary"/>  
                                            }
                                        >
                                            Buscar
                                    </Button>                                
                            </div>
                        </form>
                    )} 
                    </Formik>
                
                    {creditsData.length > 0 ? 
                            (
                            <div className="symbol-label mb-3" onClick={() => getExcel(propertiesData, "Créditos")}>
                                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
                            </div>
                            ):(
                            <div className="symbol-label mb-3">
                                <i className="flaticon2-download icon-xl text-secondary"></i>
                            </div>
                            )}
                </form>
            
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
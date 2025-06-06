/* eslint-disable eqeqeq */
import React, { useState, useMemo, useEffect} from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import propTypes from 'prop-types';
import { getExcel } from '../../../../../utils/exportExcel';
import {useListingTableContext} from "./ListingTableContext";
import { getAllBlotters, setFromBlotters, setToBlotters } from '../../../../../_redux/blotter/blottersActions';
import { formatAmountReport } from '../../../../../utils/formatData';
import { Button } from '@material-ui/core'
import { colors, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';

const cat = [{id:"1", cat:'FX'},{id:"2", cat:'OP'},{id:"3", cat:'PASE'},{id:"4", cat:'ANULAR'}]

const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.wallet = values
    filter.money = values
    filter.operations = values
    filter.description = values
    filter.deadline = values
    filter.counterparty = values
    filter.market = values
    filter.idOperator = values
    filter.charge = values
    filter.authorized = values
    filter.FX =cat.find(item => item.cat.toLowerCase().includes(values.toString().toLowerCase()))?.id
    newQueryParams.filter = filter;
    return newQueryParams;
};

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
  });



const ListingFilter = ({disabled, data, setShowCreateModal}) => {
    const [reportData, setReportData] = useState() 
    const [refresh, setRefresh] = useState(false) 
    const {
        queryParams,
        setQueryParams,
        setPageNumber
    } = useListingTableContext();

    

    const { fromBlotter , toBlotter } = useSelector(
        (s) => (s.blotters)
    );

    useMemo(() => {
        const toReport = formatAmountReport(data)
        setReportData(toReport)
    }, [data])
    
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };
    const dispatch = useDispatch()

    async function newListing(values) {         
        const from=values.from.toISOString().substring(0, 10) + "T00:00:00.000Z"
        const to=values.to.toISOString().substring(0, 10) + "T23:59:59.000Z"
        if(values.from > values.to){
        }else{
        setRefresh(true)            
        await dispatch(getAllBlotters( false , from, to))
        setRefresh(false)
        }            
    }

    async function refreshListing() { 
        const desde = fromBlotter ? fromBlotter : new Date();  
        const hasta = toBlotter ? toBlotter : new Date();          
        const inicial=desde.toISOString().substring(0, 10) + "T00:00:00.000Z"
        const final=hasta.toISOString().substring(0, 10) + "T23:59:59.000Z"
        if(inicial > final){
        }else{
        setRefresh(true)            
        await dispatch(getAllBlotters( false , inicial, final))
        setRefresh(false)
        }            
    }

    async function refreshListingWithParams(f,t) { 
        const desde = fromBlotter ? fromBlotter : new Date();  
        const hasta = toBlotter ? toBlotter : new Date();          
        const inicial=desde.toISOString().substring(0, 10) + "T00:00:00.000Z"
        const final=hasta.toISOString().substring(0, 10) + "T23:59:59.000Z"
        if(inicial > final){
        }else{
        setRefresh(true)            
        await dispatch(getAllBlotters( false , inicial, final))
        setRefresh(false)
        }            
    }

    useEffect(() => {
        const myFunction = () => {
            refreshListingWithParams(fromBlotter, toBlotter);
        };
        myFunction();    
        const intervalId = setInterval(myFunction, 5000);    
        return () => clearInterval(intervalId);
      }, [fromBlotter, toBlotter]);  

    const reportDataVista = reportData?.map((i, index)=>{
        i.chargeVista = i.charge == "1" ? "SI": i.charge == "2" ? "NO": "QUANTEX"
        i.authorizedVista = i.authorized == "1" ? "SI":"NO"
        i.FXVista = cat.filter((e)=> e.id == i.FX )[0]?.cat
        i.quantity = Number(i.quantity) 
        i.amountVista=parseFloat(parseFloat(i.amount).toFixed(2))
        i.priceVista=parseFloat(parseFloat(i.price).toFixed(4))        
        i.TransferPriceVista=parseFloat(parseFloat(i.TransferPrice).toFixed(4))
        i.performance=parseFloat(parseFloat(i.performance).toFixed(2))
        i.deadline =   i.deadline.includes('48') ? "48" : i.deadline == "CI" ? "CI": "24"        
         return i
     })

     const reportQuantex = reportData?.filter(i=> i.charge == "3")
     const reportQuantexVista = reportQuantex?.map((i, index)=>{
        i.idVista = index + 1
        i.ownPortfolio = i.market === "SENEBI"? 63200 : ""
        i.marketVista= i.market === "SENEBI"?"NO GARANTIZADO": "GARANTIZADO"
        i.nroComitenteVista=i.market === "SENEBI"? i.nroComitente.length === 3 ? "" : Number(i.nroComitente) : 63200
        i.nroContraparteVista= i.market === "SENEBI"? i.nroComitente.length === 3 ? Number(i.nroComitente): "" : Number(i.nroComitente)         
        i.priceVista=parseFloat(parseFloat(i.price).toFixed(4)) 
        i.quantity = Number(i.quantity)     
        i.deadline =   i.deadline.includes('48') ? "48" : i.deadline == "CI" ? "CI": "24"
         return i
     })

    const propertiesData = {
        header: [
            "Fecha",
            "Cartera",
            "Operación",
             "Moneda",
             "Especie",
             "Plazo",
             "Cantidad",
             "Precio c/100",
             "Monto %100",
             "contraparte",
             "Mercado",
             "Oper.",
             "Car.",
             "2c",
             "TransferPrice",
             "Rdo",
             "Obs"
            ],
        properties:[
            "date",
            "wallet",
            "operations",
             "money",
             "description",
             "deadline",
             "quantity",
             "priceVista",
             "amountVista",
             "counterparty",
             "market",
             "idOperator",
             "chargeVista",
             "authorizedVista",   
             "TransferPriceVista",       
             "performance",       
              "FXVista",            
            ] ,
        array: reportDataVista,
    }

    const propertiesQuantexData = {
        header: [
            "ID",
            "OPERACION",
             "INSTRUMENTO",
             "PLAZO",            
             "PRECIO",
             "CANTIDAD",
             "CONTRAPARTE",
             "COMITENTE",
             "CARTERA PROPIA",
             "MERCADO"             
            ],
        properties:[
            "idVista",
            "operations",
             "description",
             "deadline",            
             "priceVista",
             "quantity",
             "nroContraparteVista",
             "nroComitenteVista",
             "ownPortfolio",
             "marketVista"  
            ] ,
        array: reportQuantexVista,
    }   

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    from:new Date(),
                    to:new Date()
                }}
                onSubmit={(values) => {
                   return newListing(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row">
                            <div className="col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar"
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        applyFilter(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-4">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                        autoOk
                                        size="small"
                                        inputVariant="outlined"
                                        label="Desde"
                                        format="dd/MM/yyyy"
                                        value={values.from}
                                        cancelLabel="cancelar"
                                        onChange={date => {
                                            setFieldValue("from", date);
                                            dispatch(setFromBlotters(date))
                                            handleSubmit()
                                        }}
                                    />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-4">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                        autoOk
                                        size="small"
                                        inputVariant="outlined"
                                        label="Hasta"
                                        format="dd/MM/yyyy"
                                        value={values.to}
                                        cancelLabel="cancelar"
                                        onChange={date => {                                            
                                            setFieldValue("to", date); 
                                            dispatch(setToBlotters(date))                                            
                                            handleSubmit()
                                        }}
                                    />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <div className="symbol-label ml-7" onClick={() => refreshListing()}>
                {refresh ? <CircularProgress size={15} color="secondary"/> :
                <i className="flaticon-refresh icon-xl text-primary" role="button"></i>}
            </div>      
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => setShowCreateModal(true)}
            >
                {'nueva operación'}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => getExcel(propertiesQuantexData, "QUANTEX")}
            >
                {'QUANTEX'}
            </Button>
            
            {data.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, "Blotter")}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-7">
                <i className="flaticon2-download icon-xl text-secondary"></i>
            </div>
            )}

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
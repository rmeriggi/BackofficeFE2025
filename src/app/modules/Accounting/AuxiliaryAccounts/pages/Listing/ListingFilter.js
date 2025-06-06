/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { DownloadArchive } from '../../../../../components';
import { useHistory } from 'react-router-dom';

const prepareFilter = (queryParams, values) => {
    const { searchText, idSubAccount} = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.auxiliary = searchText;
    filter.idSubAccount = idSubAccount;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = (props) => {

    const history = useHistory();
    const [report, setReport] = useState([])
            
    useMemo(() => {
        const dataFormated = props.data
        setReport(dataFormated)
    }, [props.data])

    
    const {
        queryParams,
        setQueryParams,
        setPageNumber,
    } = useListingTableContext();
    
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    const getReportFormatted = (report) => {
        const newReport = report.map((e)=>{
            const idSubAccount = props.subAccounts.find(sa=> sa.id == e.idSubAccount)?.subAccount
            return {
                ...e,
                idSubAccount,
            }
        })
        return newReport
    }
    
    const propertiesData = {
        header: ['ID','Subcuenta', 'Cuenta Auxiliar'],
        properties:['id', 'idSubAccount', 'auxiliary'],
    }

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    idSubAccount: 0,
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({ values,handleSubmit, handleBlur, setFieldValue,}) => (

                    <form onSubmit ={handleSubmit} className ="form form-label-right"> 
                        <div className="row justify-space-around"> 
                            <div className="col-6" style={{width:'350px'}}>                                
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar"
                                    disabled={props.disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                            </div>
                            <div className="col-6" >                                
                                <TextField
                                    fullWidth
                                    select
                                    size="small"
                                    label="Subcuenta"
                                    variant="outlined"
                                    value={values.idSubAccount}
                                    onChange={(e) => {
                                    setFieldValue("idSubAccount", e.target.value)
                                    props.setAuxParams({
                                        ...props.auxParams,
                                        idSubAccount: e.target.value
                                    })
                                    handleSubmit()
                                    }}
                                >
                                    <MenuItem key={0} value={0}>
                                          Todos
                                    </MenuItem>
                                    {props.subAccounts.map((e) => (
                                        <MenuItem key={e.id} value={e.id}>
                                        {e.subAccount}
                                        </MenuItem>
                                    ))}
                                </TextField>                                
                            </div>                                                                          
                        </div>  
                    </form>
                )}
            </Formik>
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => history.push(`/accounting/auxiliary-accounts/new`)}
            >
                Crear
            </Button>
            <DownloadArchive listing={getReportFormatted(report)} data={propertiesData} name='Subcuentas' />
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
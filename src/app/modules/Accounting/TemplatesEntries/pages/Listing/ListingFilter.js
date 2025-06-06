import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { DownloadArchive } from '../../../../../components';
import { useHistory } from 'react-router-dom';

const prepareFilter = (queryParams, values) => {
    const { searchText} = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.description = searchText;
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
    
    const propertiesData = {
        header: ['ID','Módulo', 'Descripción',],
        properties:['id', 'module', 'description'],
    }

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({ values,handleSubmit, handleBlur, setFieldValue,}) => (

                    <form onSubmit ={handleSubmit} className ="form form-label-right"> 
                        <div className="row justify-space-around"> 
                            <div className="col-lg-3">                                
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{width:'160px'}}
                                        name="searchText"
                                        placeholder="Buscar módulo"
                                        disabled={props.disabled}
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
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => history.push(`/accounting/templates-entries/new`)}
            >
                Agregar
            </Button>
            <DownloadArchive listing={report} data={propertiesData} name='Plantillas Asientos' /> 
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
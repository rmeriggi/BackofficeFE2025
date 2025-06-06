import React from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';
import { MenuItem } from '@material-ui/core';
import  { DownloadArchive }  from '../../../../../components'

const prepareFilter = (queryParams, values) => {
    const { searchText} = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.auxAccount = searchText;
    filter.group = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({disabled,data, currency, entities, setValues, paramsValues}) => {

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
    }
      
    const propertiesData = {
        header: ['ID','Entidad', 'Grupo', 'Cuenta', 'Subcuenta','Cuenta auxiliar'],
        properties:['id', 'idEntity', 'group', "account", 'subAccount', 'auxiliary'],
        array: data,
    }
   
    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    idCurrency: 0,
                    idEntity: 0,
                    idGroup:0,
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({ values,handleSubmit, handleBlur, setFieldValue,}) => (

                    <form onSubmit ={handleSubmit} className ="form form-label-right"> 
                        <div className="row justify-space-around"> 
                            <div className="col-4" style={{width:'350px'}}>                                
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar por grupo o cuenta auxiliar"
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                            </div>
                            <div className="col-4" >
                                <GeneralSelector 
                                    values={values}
                                    valueName='idCurrency'
                                    keyName='currency'
                                    label='Moneda'
                                    data={currency}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={(e) => {
                                        setValues({
                                            ...paramsValues,
                                            idCurreny: e.target.value
                                        })
                                    }}
                                    extraMenuItem= {
                                    <MenuItem key={0} value={0}>
                                        Todas
                                    </MenuItem>
                                    }
                                />  
                            </div> 
                            <div className="col-4" >  
                                <GeneralSelector 
                                    values={values}
                                    valueName='idEntity'
                                    keyName='entity'
                                    label='Entidad'
                                    data={entities}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={(e) => {
                                        setValues({
                                            ...paramsValues,
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
                                                                                                                   
                        </div>  
                    </form>
                )}
            </Formik>
            <DownloadArchive listing={data} data={propertiesData} name='Plan Contable'/>
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
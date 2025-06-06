/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import {isEqual} from "lodash";
import {useListingTableContext} from "./ListingTableContext";
import { Button, MenuItem } from '@material-ui/core';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';
import { DownloadArchive } from '../../../../../components';
import { useHistory } from 'react-router-dom';

const prepareFilter = (queryParams, values) => {
    const { searchText, idCurrency, idEntity } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.group = searchText;
    filter.idCurrency = idCurrency
    filter.idEntity = idEntity
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
        const { currency, entities } = props
        const newReport = report.map((e)=>{
            const idEntity = entities.find(entity=> entity.id == e.entity).entity
            const idCurrency = currency.find(c => c.id == e.currency).currency
            return {
                ...e,
                idEntity,
                idCurrency
            }
        })
        return newReport
    }

    const propertiesData = {
        header: ['ID',"Entidad",'Moneda', 'Grupo'],
        properties:['id', "idEntity",'idCurrency', 'group'] ,
    }
    
    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    idEntity: 0,
                    idCurrency: 0
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
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row justify-space-around">
                            <div className="col" style={{width: '350px'}}>
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
                            <div className="col-4">
                                <GeneralSelector 
                                    values={values}
                                    valueName='idCurrency'
                                    keyName='currency'
                                    label='Moneda'
                                    data={props.currency}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={(e) => {
                                        props.setValues({
                                            ...values,
                                            idCurrency: e.target.value
                                        })
                                        handleSubmit()
                                    }}
                                    extraMenuItem= {
                                    <MenuItem key={0} value={0}>
                                        Todas
                                    </MenuItem>
                                    }
                                />
                            </div>
                            <div className="col-4">
                                <GeneralSelector 
                                    values={values}
                                    valueName='idEntity'
                                    keyName='entity'
                                    label='Entidad'
                                    data={props.entities}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={(e) => {
                                        props.setValues({
                                            ...values,
                                            idEntity: e.target.value
                                        })
                                        handleSubmit()
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
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => history.push(`/accounting/accounting-groups/new`)}
            >
                Agregar
            </Button>
            <DownloadArchive listing={getReportFormatted(report)} data={propertiesData} name='Grupos contables' />
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
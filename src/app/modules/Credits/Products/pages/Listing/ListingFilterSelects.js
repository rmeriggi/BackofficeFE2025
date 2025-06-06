import React from 'react';
import { Formik } from "formik";
import { MenuItem } from '@material-ui/core';
import { getAllProducts } from '../../utils/service';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';

const ListingFilterSelects = (props) => {
    
    const getListProducts = async(values) => {
        try {
            const response = await getAllProducts(values)
            props.setData(response)
            props.disableLoading() 
        } catch {
            props.setData([])
            props.disableLoading()
        }
        
    }

    return (
        <>
            <Formik
                initialValues={{
                    idEntity: 0,
                    idCurrency: 0
                }}
                onSubmit={(values) => {
                    props.enableLoading()
                    getListProducts(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right mr-5">
                        <div className="row align-items-center" style={{width: "400px"}}>
                            <div className="col-lg-6">
                                <GeneralSelector 
                                    values={values}
                                    valueName='idCurrency'
                                    keyName='currency'
                                    label='Moneda'
                                    data={props.currency}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={() => {
                                        handleSubmit()
                                    }}
                                    extraMenuItem={
                                        <MenuItem key={0} value={0}>
                                            Todas
                                        </MenuItem>
                                    }
                                /> 
                            </div>
                            <div className="col-lg-6">
                                <GeneralSelector 
                                    values={values}
                                    valueName='idEntity'
                                    keyName='entity'
                                    label='Entidad'
                                    data={props.entities}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={() => {
                                        handleSubmit()
                                    }}
                                    extraMenuItem={
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
        </>
    );
}

export default ListingFilterSelects;
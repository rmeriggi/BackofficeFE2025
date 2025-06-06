import React from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';

const ListingFilter = (props) => { 

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-left">
                        <div className="row">
                            <div className="col-lg-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{width:'175px', marginRight:"40px"}}
                                    name="searchText"
                                    placeholder="Buscar por ID"
                                    disabled={props.disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
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
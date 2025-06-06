/* eslint-disable eqeqeq */
import React from 'react';
import { Button } from '@material-ui/core';
import { getExcel } from '../../../../../utils/exportExcel';
import { useModal } from '../../../../../hooks/useModal';
import { FiltersModal } from '../../components/modals/FiltersModal';

const ListingFilter = ({dataTable, entities, currencies, setCollections, disableLoading, enableLoading}) => {

    const [show, openModal, closeModal] = useModal()

    const propertiesData = {
        header: ["ID", 'Entidad', 'Moneda', "Fecha", "Canal de cobro", "Tipo de movimiento", "Importe" ],
        properties:["id",'entity', 'currency', "movementDate", "paymentChanel", "movementType", "amount"],
        array: dataTable,
    }

    return (
        <>
            <div>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={openModal}
                >
                    Filtros
                </Button>
            </div>
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
            
            <FiltersModal 
                show={show} 
                onHide={closeModal}
                entities={entities}
                currencies={currencies}
                setCollections={setCollections}
                enableLoading={enableLoading}
                disableLoading={disableLoading}
            />
        </>
    );
}

export default ListingFilter
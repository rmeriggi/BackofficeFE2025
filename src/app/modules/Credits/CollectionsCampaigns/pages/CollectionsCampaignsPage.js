import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { withSnackbar } from '../../../../HOCs/withSnackbar';
import ConfirmationModal from '../components/ConfirmationModal';

const CollectionsCampaignsPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState()
    
    const openActionModal = () => {
        setShowModal(true)
    }

    const closeActionModal = () => {
        setShowModal(false)
    }

    return(
        <div className="container bg-white py-5 d-flex">
            <div className="col-4 my-5 d-flex justify-content-center"> 
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    onClick={()=> {
                        setId(1)
                        openActionModal()
                    }}
                >
                    Campaña cobro cuenta corriente
                </Button>
            </div>
            <div className="col-4 my-5 d-flex justify-content-center"> 
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    onClick={()=> {
                        setId(2)
                        openActionModal()
                    }}
                >
                    Campaña cobro mora temprana
                </Button>
            </div>
            <div className="col-4 my-5 d-flex justify-content-center"> 
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    onClick={()=> {
                        setId(3)
                        openActionModal()
                    }}
                >
                    Campaña cobro mora tardía
                </Button>
            </div>
            <ConfirmationModal show={showModal} onHide={closeActionModal} id={id}/>
        </div>
    )
}

export default withSnackbar(CollectionsCampaignsPage)
import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useHistory } from "react-router-dom";
import { useAllTaxes } from "../../utils/apiHooks";
import { DetailTaxModal } from "../modals/DetailTaxModal";
import { useOneTax } from "../../utils/apiHooks";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import {LayoutSplashScreen} from "../../../../../../_metronic/layout"
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { Button } from "@material-ui/core";

export default function Listing() {

    const [showModal, setShowModal] = useState(false)
    const [idTax, setIdTax] = useState("1")
    const isMounted = useIsMountedRef()

    const [taxesData, taxesCompleted] = useAllTaxes(isMounted);
    const [oneTaxDetail, oneTaxDetailCompleted] = useOneTax(isMounted, idTax)

    const openDetailTax = (id) => {
        setShowModal(true)
        setIdTax(id)
    }

    const closeDetailTax = () => {
        setShowModal(false)
    }

    const history = useHistory()
    const openCreateNewTax = () => {
        history.push("/taxes/taxes/new")
    }


    if (!(taxesCompleted && oneTaxDetailCompleted)) {
        return <LayoutSplashScreen />;
    }
    const { taxes } = taxesData
    const { tax } = oneTaxDetail

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={taxes.length === 0}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="large"
                        onClick={()=> openCreateNewTax() }
                    >
                        Crear impuesto
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <DetailTaxModal
                    show={showModal}
                    onHide={closeDetailTax}
                    oneTaxDetail={tax}
                />
                 <ListingTable taxesData={taxes} openDetailTax={openDetailTax}/>
            </CardBody>
        </Card>
    )
}
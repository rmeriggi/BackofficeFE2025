import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { ReasignCreditModal } from "../ReasignCreditModal/ReasignCreditModal";
import {  LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllCollections } from "../../utils/apiHook";
import { useSelector } from "react-redux";

export default function Listing() {

    const isMounted = useIsMountedRef();

    const { user } = useSelector((state)=> state.auth)

    const suhbeader = useSubheader();
    suhbeader.setTitle("Gestión de cobranzas");

    const [collections, collectionsComplete] = useAllCollections(isMounted, user.id);
    const [showModal, setShowModal] = useState()
    const [data, setData] = useState()

    useEffect(()=> {
        if(collectionsComplete) setData(collections.collectionsManagment)
    }, [collections, collectionsComplete])

    const openReasignCredit = (id) => {
        setShowModal(true)
    }
    const closeModal = () => {
    setShowModal(false)
    }

    if(!(collectionsComplete && data)) return <LayoutSplashScreen />

    
    const { credits } = data

    return (
        <Card>
            <CardHeader>
                <CardHeaderToolbar style={{width: '100%', justifyContent: 'space-between'}}>
                    <ListingFilter  disabled={credits.length === 0} data={credits} setData={setData} collections={collections}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable collectionsData={credits} openReasignCredit={openReasignCredit}/>
                <ReasignCreditModal show={showModal} onHide={closeModal}/>
            </CardBody>
        </Card>
    )
}
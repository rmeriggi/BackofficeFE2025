/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import ListingFilter from "./ListingFilter";
import { CircularProgress } from "@material-ui/core";
import { getBalancesItau } from "../../utils/service";
import ModalConfirm from "../Create/ModalConfirm";
import { withSnackbar } from "../../../../../HOCs/withSnackbar";
import { useModal } from "../../../../../hooks/useModal";
import { adapterBalancesItau } from "../../adapter/adapterBalancesItau";
import { useListingTableContext } from "./ListingTableContext";
import { getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

function Listing({setOpenMessage}) {

    const subHeader = useSubheader()
    subHeader.setTitle('Saldos Itaú Sponsor')
    const [dataList, setDataList] = useState()
    const [loading, setLoading ] = useState(false)
    const [show, openModal, closeModal, id] = useModal()

    const [entities] = useFetchCombos('entities', getEntities)

    const {dates, setDates} = useListingTableContext();

    useEffect(() => {
        const getList = async() => {
            try {
                const response = await getBalancesItau(dates)
                const adaptedResponse = adapterBalancesItau(response.balancesItau)
                setDataList(adaptedResponse)
            } catch (error) {
                setDataList([])
            }
        } 
        getList()
    
    }, [show, dates])
    
    if (!dataList) return <LayoutSplashScreen />
    
    const formatData = dataList.map((d) => {
        const entity = entities.find(e => e.id === Number(d.entity))?.entity || "-"
        return {
            ...d,
            entity
        }
    })

    return (
        <>
        <Card>
            <CardHeader title="Saldos Itaú Sponsor" >
                <CardHeaderToolbar>
                    <ListingFilter 
                        disabled={formatData.length === 0}
                        data={formatData}
                        setDataList={setDataList}
                        setLoading={setLoading}
                        loading={loading}
                        setDates={setDates}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody> 
                {loading ? 
                    <CircularProgress size={20} color="secondary"/> 
                :
                    <ListingTable 
                        dataTable={formatData} 
                        openModal={openModal}
                    />
                }
            </CardBody>
        </Card>
        <ModalConfirm setOpenMessage={setOpenMessage} id={id} onHide={closeModal} show={show}/>
        </>
    )
}

export default withSnackbar(Listing)
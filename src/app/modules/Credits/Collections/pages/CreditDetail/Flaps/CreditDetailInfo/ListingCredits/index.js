/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import useIsMountedRef from "../../../../../../../../hooks/useIsMountedRef";
import { useOneClient } from "../../../../../../../Clients/Clients/utils/apiHooks";
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";
import { useStatusCredits } from "../../../../../../Credits/utils/apiHook";
import { useParams } from "react-router-dom";
import { clientAdapter } from "../../../../../../../Clients/Clients/adapters/clientAdapter";
export default function ListingCredits({idClient}) {

  const isMounted = useIsMountedRef();
  const { id } = useParams();
  const [clientData, clientCompleted] = useOneClient(idClient, isMounted)
  const [statusCredits, statusCreditsComplete] = useStatusCredits(isMounted)

  if(!(clientCompleted && statusCreditsComplete)) return <LayoutSplashScreen />

  const client  = clientAdapter(clientData.client);
  const { creditsStatus } = statusCredits
    
    const creditsStatusFormatted = client.credits.creditsRequested.map(q => {
    const status = creditsStatus.find(c => c.id == q.status)?.status || "Sin datos"
    return {
        ...q,
        status
    }
    })

    const filteredByCurrentCredit = creditsStatusFormatted.filter(c => c.id != id);

    return (
        <ListingTable collectionsData={filteredByCurrentCredit}/>
    )
}
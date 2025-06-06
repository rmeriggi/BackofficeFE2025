/* eslint-disable eqeqeq */
import React from "react";
import { useParams } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../../../../hooks/useIsMountedRef";
import { clientAdapter } from "../../../../../../../Clients/Clients/adapters/clientAdapter";
import { useOneClient } from "../../../../../../../Clients/Clients/utils/apiHooks";
import { statusCreditsAdapter } from "../../../../../../adapters";
import { useStatusCredits } from "../../../../../utils/apiHook";
import {ListingTable} from "./ListingTable";

export default function ListingCredits({idClient}) {

  const isMounted = useIsMountedRef();
  const {id} = useParams()
  const [clientData, clientCompleted] = useOneClient(idClient, isMounted)
  const [statusCredits, statusCreditsComplete] = useStatusCredits(isMounted)

  if(!(clientCompleted && statusCreditsComplete)) return <LayoutSplashScreen />

  const client  = clientAdapter(clientData.client);
  const creditsStatus  = statusCreditsAdapter(statusCredits.creditsStatus);
  
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
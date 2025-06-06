import React from 'react'
import { Button } from "@material-ui/core";
import { LayoutSplashScreen } from '../../../../../../../../_metronic/layout';
import useIsMountedRef from '../../../../../../../hooks/useIsMountedRef';
import { clientAdapter } from '../../../../../../Clients/Clients/adapters/clientAdapter';
import { useOneClient } from '../../../../../../Clients/Clients/utils/apiHooks';

export default function Contact({idClient}) {

  const isMounted = useIsMountedRef();  
  const [clientData, clientCompleted] = useOneClient(idClient, isMounted)

  if(!clientCompleted) return <LayoutSplashScreen />

  const client = clientAdapter(clientData.client);

  const clientPhone = client.client.phone

  const initiateWhatsApp = (clientPhone) => {
     window.open(`https://wa.me/${clientPhone}?text=Hola!`, '_blank');
  };

  return (
    <Button
    variant="contained"
    color="secondary"
    className="ml-2"
    size="large"
    onClick={()=>{initiateWhatsApp(clientPhone)}}
  >
    WHATSAPP
  </Button>
  )
}

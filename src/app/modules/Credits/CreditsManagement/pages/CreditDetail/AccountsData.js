import React from 'react'
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { clientAdapter } from '../../../../Clients/Clients/adapters/clientAdapter';
import { useOneClient } from '../../../../Clients/Clients/utils/apiHooks'

export default function AccountsData({idClient}) {

  const isMounted = useIsMountedRef();
  const [clientData, clientCompleted] = useOneClient(idClient, isMounted)

  if(!clientCompleted) return <LayoutSplashScreen />

  const client = clientAdapter(clientData.client);
  
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
  
  return (
    <div className='d-flex '> 
        <span className='text-muted p-1'>Nombre y apellido: {client.client?.name} {client.client?.lastName}</span>
        <span className='text-muted p-1'>Telefono principal: {client?.client?.phone}</span>
        <span className='text-muted p-1'>Telefono secundario: {client?.client?.secondaryPhone}</span>
        <span className='text-muted p-1'>Dni: {client?.identity?.dni}</span>
        <span className='text-muted p-1'>Edad: {getAge(client.identity.date)}</span>
        <span className='text-muted p-1'>Email principal: {client?.client?.email}</span>
        <span className='text-muted p-1'>Email alternativo: {client?.client?.secondaryEmail}</span>
    </div>
  )
}
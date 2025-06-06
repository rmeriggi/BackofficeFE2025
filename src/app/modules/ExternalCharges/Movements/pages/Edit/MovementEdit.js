import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../_metronic/_partials/controls";
import { MovementEditForm } from "./MovementEditForm";
import { useParams, useHistory } from "react-router";
import { LayoutSplashScreen, useSubheader } from '../../../../../../_metronic/layout';
import  useIsMountedRef  from '../../../../../hooks/useIsMountedRef';
import { Button } from "@material-ui/core";
import { useMovement, useStatus } from "../../utils/apiHooks";
import { MovementStatusEnum } from "./MovementStatusEnum";

export function MovementEdit() {

  const isMounted = useIsMountedRef();
  const { id } = useParams();
  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Editar Movimiento");

  const [movement, movementCompleted] = useMovement(id, isMounted);
  const [status, statusCompleted] = useStatus(isMounted)

  if (!(movementCompleted && statusCompleted)) {
    return <LayoutSplashScreen />; 
  }

  const filterStatus = (statusList) => {
    const statusFiltered = statusList.filter((e) =>{
      return (
        e.id === MovementStatusEnum.PENDING || 
        e.id === MovementStatusEnum.REJECTED || 
        e.id === MovementStatusEnum.ACCEPTED || 
        e.id === MovementStatusEnum.UPLOADED 
      )
    })
    return statusFiltered
  }

  return (
    <Card>
      <CardHeader title={`${movement.id} - ${movement.description}`}>
        <CardHeaderToolbar>
          <Button
            onClick={(e)=>{
              history.goBack();
            }}
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <MovementEditForm
            movement={movement}
            status={movement.paymentMethodId === 22? filterStatus(status) : status}
          />
        </div>
      </CardBody>
    </Card>
  );
}
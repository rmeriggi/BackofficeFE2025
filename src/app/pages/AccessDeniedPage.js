import React from 'react';
import {Card, CardBody} from "../../_metronic/_partials/controls";

export const AccessDeniedPage = () => {
    return (
        <Card className="mt-7">
            <CardBody>
                <h1 className="text-center">Acceso denegado.</h1>
                <h3 className="text-center text-secondary mt-3">Usted no posee permisos para visitar esta pagina.</h3>
            </CardBody>
        </Card>
    )
}

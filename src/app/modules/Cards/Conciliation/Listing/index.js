/* eslint-disable eqeqeq */
import React from "react";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";

import { useSubheader } from "../../../../../_metronic/layout";

import ListingFilter from "./ListingFilter";

export default function Listing() {
  const subHeader = useSubheader();
  subHeader.setTitle("Conciliación");

  const brands = [
    {
      id: "liq-001",
      period: "01/04/2025 - 30/04/2025",
      liquidation_date: "11/05/2025",
      entity: "Banco Ejemplo SA",
    },
    {
      id: "liq-002",
      period: "01/05/2025 - 29/05/2025",
      liquidation_date: "4/06/2025",
      entity: "Banco Ejemplo SA",
    },
    {
      id: "liq-003",
      period: "01/06/2025 - 30/06/2025",
      liquidation_date: "5/07/2025",
      entity: "Banco Ejemplo SA",
    },
  ];

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilter disabled={brands.length === 0} data={brands} />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListingTable dataTable={brands} />
      </CardBody>
    </Card>
  );
}

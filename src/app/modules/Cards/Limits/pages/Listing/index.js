import React from "react";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";

const limitsMock = {
  limitsList: [
    {
      id: 1,
      brand: "Visa",
      card_type: "Debit",
    },
    {
      id: 2,
      brand: "Master Card",
      card_type: "Credit",
    },
    {
      id: 3,
      brand: "Master Card",
      card_type: "Debit",
    },
    {
      id: 4,
      brand: "Visa",
      card_type: "Prepaid",
    },
  ],
};

export function Listing() {
  const { limitsList } = limitsMock;

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilter disabled={limitsList.length === 0} data={limitsList} />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListingTable limits={limitsList} />
      </CardBody>
    </Card>
  );
}

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
      buy_limit: "$5.000.000",
      quotes_limit: "$2.000.000",
      cash_limit: "$2.000.000",
    },
    {
      id: 2,
      brand: "Master Card",
      card_type: "Credit",
      buy_limit: "$5.000.000",
      quotes_limit: "$2.000.000",
      cash_limit: "$2.000.000",
    },
    {
      id: 3,
      brand: "Master Card",
      card_type: "Debit",
      buy_limit: "$5.000.000",
      quotes_limit: "$2.000.000",
      cash_limit: "$2.000.000",
    },
    {
      id: 4,
      brand: "Visa",
      card_type: "Prepaid",
      buy_limit: "$5.000.000",
      quotes_limit: "$2.000.000",
      cash_limit: "$2.000.000",
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

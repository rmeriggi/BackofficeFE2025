import React from "react";
import Listing from "./Listing";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AgreementsPage() {
  return (
    <ListingTableContextProvider>
      <Listing />
    </ListingTableContextProvider>
  );
}

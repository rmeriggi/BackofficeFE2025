import React, { useState } from "react";
import { ListingTable } from "./ListingTable";
import ListingFilter from "./ListingFilter";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { cardsAdapter } from "../Listing/adapters/cardsAdapters";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useCards } from "../../utils/apihooks";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import EmitCardModal from "../EmitCardModal/EmitCardModal";
export function Listing() {
  const isMountedRef = useIsMountedRef();

  const [cardsData, cardsCompleted] = useCards(isMountedRef);
  const [showModal, setShowModal] = useState(false);
  if (!cardsCompleted) return <LayoutSplashScreen />;

  const cards = cardsAdapter(cardsData);

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          {showModal && (
            <EmitCardModal
              show={showModal}
              onClose={() => setShowModal(false)}
            />
          )}
          <ListingFilter
            setShowModal={setShowModal}
            disabled={cards.length === 0}
            data={cards}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListingTable cards={cards} />
      </CardBody>
    </Card>
  );
}

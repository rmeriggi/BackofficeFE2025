import React from "react";
/* import { LayoutSplashScreen } from "../../../../../../_metronic/layout"; */
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
/* import useIsMountedRef from "../../../../../hooks/useIsMountedRef"; */
import { formatDate } from "../../../../../utils/formatData";
/* import { useAllRos } from "../../utils/apiHooks"; */
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";

export default function Listing() {
  /*   const isMounted = useIsMountedRef(); */
  /*   const [allRos, allRosCompleted] = useAllRos(isMounted); */

  const allRos = {
    ROS: [
      {
        id: 60366,
        date: "2025-01-19T01:00:02.722Z",
        client: "Abdiel",
        transaction:
          "invoice transaction at Sipes, Goodwin and Corkery using card ending with ***8656 for TJS 584.95 in account ***15378641",
        transactionsId: 80588,
        action: "http://ward.biz",
      },
      {
        id: 69274,
        date: "2025-03-30T16:25:13.565Z",
        client: "Korey",
        transaction:
          "deposit transaction at Armstrong, Littel and Wehner using card ending with ***5407 for XPF 721.79 in account ***88481006",
        transactionsId: 14850,
        action: "http://kiel.org",
      },
      {
        id: 2057,
        date: "2024-12-10T04:49:24.640Z",
        client: "Dion",
        transaction:
          "deposit transaction at Cronin, Schamberger and Kohler using card ending with ***3499 for FJD 872.17 in account ***55801665",
        transactionsId: 23588,
        action: "https://aida.biz",
      },
      {
        id: 26110,
        date: "2024-12-01T18:46:44.628Z",
        client: "Tamara",
        transaction:
          "payment transaction at Doyle - Leuschke using card ending with ***7101 for CLP 568.06 in account ***81802203",
        transactionsId: 23806,
        action: "http://lillian.info",
      },
    ],
  };

  /*   if (!allRosCompleted) {
    return <LayoutSplashScreen />;
  } */

  const rosFormated = formatDate(allRos.ROS);

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilter disabled={rosFormated.length === 0} />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListingTable rosData={rosFormated} />
      </CardBody>
    </Card>
  );
}

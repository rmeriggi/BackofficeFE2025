import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { channelsadapter } from "../../../../../adapters/channelsAdapter";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress } from "@material-ui/core";
import { useChannels } from "../../../../Credits/Collections/utils/apiHook";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";
import { getListCollection } from "../../utils/service";
import { collectionsAdapter } from "../../adapters/collectionsAdapter";

function Listing() {
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const [collections, setCollections] = useState([]);
  const { loading, enableLoading, disableLoading } = useLoading(false);

  const isMounted = useIsMountedRef();
  const [channels] = useChannels(isMounted);
  const channelsAdapted = channelsadapter(channels);

  const fetchCollections = async () => {
    enableLoading();
    try {
      const CURRENT_MONTH = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );

      const req = {
        idCurrency: 0,
        idEntity: 0,
        fromDate: CURRENT_MONTH.toISOString(),
        toDate: new Date().toISOString(),
        idModule: 0,
        idProduct: 0,
        idPaymentChannel: 0,
      };

      const response = await getListCollection(req);
      const adapted = collectionsAdapter(response);
      setCollections(adapted);
    } catch (error) {
      setCollections([]);
    } finally {
      disableLoading();
    }
  };

  useEffect(() => {
    fetchCollections();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(collections, "COLLECTIONS");

  return (
    <Card>
      <CardHeader>
        <CardHeaderToolbar>
          <ListingFilter
            dataTable={collections}
            entities={entities}
            currencies={currencies}
            channels={channelsAdapted}
            setCollections={setCollections}
            enableLoading={enableLoading}
            disableLoading={disableLoading}
            fetchCollections={fetchCollections} // 🔁 le pasamos la función
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {loading ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <ListingTable dataTable={collections} />
        )}
      </CardBody>
    </Card>
  );
}

export default Listing;

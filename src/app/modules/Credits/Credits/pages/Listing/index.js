/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { Button, CircularProgress } from "@material-ui/core";
import { useStatusCredits } from "../../utils/apiHook";
import { useAllProducts } from "../../../Products/utils/apiHook";
import {
  creditsAdapter,
  productsAdapter,
  statusCreditsAdapter,
} from "../../../adapters";
import { withLayoutSplashScreen } from "../../../../../HOCs/withLayoutSplashScreen";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { changeStatusCredit, getAllCreditsList } from "../../utils/service";
import { withSnackbar } from "../../../../../HOCs/withSnackbar";
import { ModalWrapper } from "../../../../../components/ModalWrapper";
import { useModal } from "../../../../../hooks/useModal";
import { getEntities } from "../../../../../_redux//combos/combosActions";
import { useFetchCombos } from "../../../../../hooks/useFetchCombos";
import { useFetchClients } from "../../../../../hooks";

const initialRequest = {
  status: "0",
  fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  toDate: new Date(),
};

const Listing = ({ setOpenMessage, data }) => {
  const [allCredits, setAllCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectStatus, setSelectStatus] = useState("1");
  const [show, openModal, closeModal] = useModal();
  const [action, setAction] = useState({
    status: "Activo",
    value: 4,
    idCredit: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [request, setRequest] = useState(initialRequest);
  const [entitiesData] = useFetchCombos("entities", getEntities);
  const [statusCredits, productsData] = data;
  const credits = creditsAdapter(allCredits);
  const creditsStatus = statusCreditsAdapter(statusCredits.creditsStatus);
  const products = productsAdapter(productsData.products);
  const [clients] = useFetchClients();

  useEffect(() => {
    async function getProductsCreditsList() {
      try {
        const response = await getAllCreditsList(request);
        setAllCredits(response);
        setLoading(false);
      } catch (error) {
        setAllCredits([]);
        setLoading(false);
      }
    }
    getProductsCreditsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const openModalConfirm = (e, id) => {
    if (e.target.value === "4") {
      setSelectStatus("4");
      setAction({ status: "Activo", value: 3, idCredit: id });
    } else if (e.target.value === "5") {
      setSelectStatus("5");
      setAction({ status: "Rechazado", value: 5, idCredit: id });
    }
    openModal();
  };

  const handleClick = async () => {
    setIsSubmitting(true);
    const req = {
      idCredit: action.idCredit,
      status: action.value,
    };
    try {
      const response = await changeStatusCredit(req);
      if (response.success === "OK") {
        setOpenMessage("success", "Acción realizada correctamente");
        setIsSubmitting(false);
        closeModal();
      }
    } catch (error) {
      setOpenMessage(
        "error",
        "Acción no realizada, por favor intente más tarde"
      );
      setIsSubmitting(false);
    }
  };

  const onHideModal = () => {
    setSelectStatus("1");
    closeModal();
  };

  const newArr = credits.map((c) => {
    const productName =
      products?.find((p) => p.id == c.productName)?.product || "Sin datos";
    const idEntity =
      products?.find((p) => p.id == c.productName)?.idEntity || "Sin datos";
    const iva =
      products?.find((p) => p.id == c.productName)?.iva || "Sin datos";
    const status =
      creditsStatus?.find((s) => s.id == c.status)?.status || "Sin datos";
    const entity =
      entitiesData.data?.find((e) => e.id == idEntity)?.entity || "Sin Datos";
    const total =
      products?.find((p) => p.id == c.productName)?.amount || "Sin datos";
    const name = clients?.find((x) => x.id == c.idClient)?.name || "Sin Datos";
    const surname =
      clients?.find((x) => x.id == c.idClient)?.lastName || "Sin Datos";
    const dni =
      Number(clients?.find((x) => x.id == c.idClient)?.passport) || "Sin Datos";
    const email =
      clients?.find((x) => x.id == c.idClient)?.email || "Sin Datos";
    return {
      ...c,
      productName,
      status,
      idEntity,
      iva,
      entity,
      total,
      name,
      surname,
      dni,
      email,
    };
  });

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilter
            disabled={newArr.length === 0}
            creditsData={newArr}
            setAllCredits={setAllCredits}
            setLoading={setLoading}
            creditsStatus={creditsStatus}
            setRequest={setRequest}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {loading ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <ListingTable
            creditsData={newArr}
            creditsStatus={creditsStatus}
            openModalConfirm={openModalConfirm}
            selectStatus={selectStatus}
          />
        )}
      </CardBody>
      <ModalWrapper
        show={show}
        onHide={onHideModal}
        title="Confirmar acción"
        footer={() => {
          return (
            <div className="form-group d-flex flex-wrap justify-content-end">
              <Button
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={() => handleClick()}
                endIcon={
                  isSubmitting && (
                    <CircularProgress size={20} color="secondary" />
                  )
                }
              >
                Confirmar
              </Button>
              <Button
                onClick={closeModal}
                variant="contained"
                color="secondary"
                className="ml-3"
              >
                Volver
              </Button>
            </div>
          );
        }}
      >
        <div>
          <span>
            ¿Estas seguro que desea cambiar el estado a {action.status}?
          </span>
        </div>
      </ModalWrapper>
    </Card>
  );
};

const hooks = [
  {
    hook: useStatusCredits,
  },
  {
    hook: useAllProducts,
    params: { idEntity: 0, idCurrency: 0 },
  },
];
export default withSnackbar(withLayoutSplashScreen(Listing, hooks));

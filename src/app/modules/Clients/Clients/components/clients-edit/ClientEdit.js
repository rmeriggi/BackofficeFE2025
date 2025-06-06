import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { Button, CircularProgress } from "@material-ui/core";
import { format } from "date-fns";
import AccountsListEdit from "../AccountsListEdit";
import { ScoreEditForm } from "./ScoreEditForm";
import { IdentityEditForm } from "./IdentityEditForm";
import { ClientEditForm } from "./ClientEditForm";
import { getAllClients } from "../../../../../_redux/clients/clientsActions"; 
import { useDispatch } from "react-redux";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useOneClient, useUrlImages } from "../../utils/apiHooks";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import RequestedCreditsList from "./RequestedCredits/RequestedCreditsList";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import {
  editIdentityOneClient,
  editOneClient,
  editScoreOneClient,
  getEmailVerification,
  recoverPassword,
  calculateMatrix,
  getCalification
} from "../../utils/service";
import { clientAdapter } from "../../adapters/clientAdapter";
import DocumentList from "../document-list/DocumentList";
import ActivitiesList from "../ActivitiesList";
import RelationsList from "./Relations/Listing/index";
import { DisableClientModal } from "../../../../../components/DisableClientModal";

export function ClientEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const isMounted = useIsMountedRef();
  const dispatch = useDispatch();

  const [clientToEdit, clientToEditCompleted] = useOneClient(id, isMounted);
  const [urlImage, urlImageCompleted] = useUrlImages(isMounted);

  const [clientCalification, setClientCalification] = useState("SIN EVALUACIÓN");
 
  const fetchCalification = async () => {
    try {
      const response = await getCalification(id); 
      setClientCalification(response.data);
    } catch (error) {
      console.error("Error al obtener la calificación del cliente:", error);
    }
  };
  useEffect(() => {
    fetchCalification();
  }, [id]);
  
  const [tab, setTab] = useState(
    history.location.state?.tab || history.location.state?.tab || "client"
  );
  const btnRef = useRef();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState(
    "El cliente fue modificado correctamente."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDisableClientModal, setShowDisableClientModal] = useState(false);

  if (!(clientToEditCompleted && urlImageCompleted)) {
    return <LayoutSplashScreen />;
  }

  const client = clientAdapter(clientToEdit.client);
  const initClientForEdit = client.client;
  const scoreClientForEdit = client.score;
  const clientIdentityForEdit = client.identity;
  const accountHNT = client.hntAccount;
  const accountAR = client.arAccount;
  const accountUS = client.usAccount;
  const creditsRequested = client.credits.creditsRequested;
  const activities = client.activities;
  const relations = client.relations;

  const { url } = urlImage;
  const backToClientsList = () => {
    history.push(`/clients/clients`);
  };

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  const verifiedemail = async (values) => {
    try {
      await getEmailVerification(id);
      setVariant("success");
      setMessage("El E-mail del cliente se encuentra verificado.");
      setOpenSnackbar(true);
    } catch {
      setVariant("error");
      setMessage("El E-mail del cliente no se encuentra verificado.");
      setOpenSnackbar(true);
    }
  };

  const recoverpassword = async (values) => {
    try {
      await recoverPassword(id);
      setVariant("success");
      setMessage("E-mail de recuperación de contraseña enviado con éxito.");
      setOpenSnackbar(true);
    } catch {
      setVariant("error");
      setMessage("Error al recuperar la contraseña.");
      setOpenSnackbar(true);
    }
  };

  const handleCalculateMatrix = async () => {
    setIsSubmitting(true);
    try {
      await calculateMatrix(id); 
      await fetchCalification(); 
      setVariant("success");
      setMessage("La matriz fue calculada correctamente.");
      setOpenSnackbar(true); 
    } catch (error) {
      setVariant("error");
      setMessage("Error al calcular la matriz. Por favor, intentá de nuevo.");
      setOpenSnackbar(true); 
    } finally {
      setIsSubmitting(false); 
    }
  };

  const saveClient = async (values) => {
    if (tab === "client") {
      try {
        await editOneClient(id, values);
        setVariant("success");
        setMessage("El cliente fue modificado correctamente.");
        dispatch(getAllClients("*"));
        setOpenSnackbar(true);
      } catch {
        setVariant("error");
        setMessage(
          "El cliente no pudo ser modificado correctamente. Por favor, volvé a intentar."
        );
        setOpenSnackbar(true);
      }
    }
    if (tab === "identity") {
      try {
        if (typeof values.date !== "string") {
          values.date = format(values.date, "yyyy/MM/dd");
        }
        await editIdentityOneClient(id, { identity: values });
        setVariant("success");
        setMessage("El cliente fue modificado correctamente.");
        setOpenSnackbar(true);
      } catch {
        setVariant("error");
        setMessage(
          "El cliente no pudo ser modificado correctamente. Por favor, volvé a intentar."
        );
        setOpenSnackbar(true);
      }
    }
    if (tab === "score") {
      try {
        if (typeof values.expiration !== "string") {
          values.expiration = format(values.expiration, "yyyy/MM/dd");
        }
        await editScoreOneClient(id, values);
        setVariant("success");
        setMessage("El cliente fue modificado correctamente.");
        setOpenSnackbar(true);
      } catch {
        setVariant("error");
        setMessage(
          "El cliente no pudo ser modificado correctamente. Por favor, volvé a intentar."
        );
        setOpenSnackbar(true);
      }
    }
  };

  const saveClientClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const handleSuccessDisableClient = () => {
    setShowDisableClientModal(false);
    setVariant("success");
    setMessage("El cliente ha sido dado de baja correctamente.\n.");
    setOpenSnackbar(true);

    setTimeout(() => {
      backToClientsList();
    }, 2000);
  };

  const getCalificationStyle = () => {
    switch (clientCalification) {
      case "ALTO":
        return { backgroundColor: "#EE2D41", color: "white" };
      case "MEDIO":
        return { backgroundColor: "#EE9D01", color: "black" };
      case "BAJO":
        return { backgroundColor: "#0BB7AF", color: "white" };
      case "SIN EVALUACIÓN":
        return { backgroundColor: "#3699FF", color: "white" };
      default:
        return {};
    }
  };

  return (
    <Card>
      <CardHeader title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{`${initClientForEdit.bussinessName || "Editar Cliente"}`}</span>
          <div style={{ ...getCalificationStyle(), padding: "3px 5px", borderRadius: "4px", fontSize: "0.75rem", marginLeft: "10px", height: "fit-content" }}>
            {clientCalification}
          </div>
        </div>
      }>
        <CardHeaderToolbar>
          <Button
            variant="contained"
            color="secondary"
            className="ml-1"
            size="small" 
            disabled={isSubmitting}
            onClick={handleCalculateMatrix}  
            endIcon={
              isSubmitting && <CircularProgress size={20} color="secondary" />
            }
          >
            Calcular matriz
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-1"
            size="small" 
            disabled={isSubmitting}
            onClick={verifiedemail}
            endIcon={
              isSubmitting && <CircularProgress size={20} color="secondary" />
            }
          >
            Verificar Email
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-1"
            size="small"
            disabled={isSubmitting}
            onClick={recoverpassword}
            endIcon={
              isSubmitting && <CircularProgress size={20} color="secondary" />
            }
          >
            Recuperar Contraseña
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="ml-1"
            size="small"
            onClick={backToClientsList}
          >
            Volver
          </Button>
          {parseInt(initClientForEdit.status) !== 6 ? (
            <Button
              variant="outlined"
              style={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
              className="ml-1"
              size="small"
              onClick={() => setShowDisableClientModal(true)}
            >
              BAJA
            </Button>
          ) : null}
          <Button
            variant="contained"
            color="secondary"
            className="ml-1"
            size="small"
            disabled={isSubmitting}
            onClick={saveClientClick}
            endIcon={
              isSubmitting && <CircularProgress size={20} color="secondary" />
            }
          >
            Actualizar
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DisableClientModal
          show={showDisableClientModal}
          onHide={() => setShowDisableClientModal(false)}
          setOpenSnackbar={setOpenSnackbar}
          setVariant={setVariant}
          setMessage={setMessage}
          id={id}
          handleSuccess={() => handleSuccessDisableClient()}
        />
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("client")}>
            <a
              className={`nav-link ${tab === "client" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "client").toString()}
            >
              Cliente
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("identity")}>
            <a
              className={`nav-link ${tab === "identity" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "identity").toString()}
            >
              Identidad
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("score")}>
            <a
              className={`nav-link ${tab === "score" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "score").toString()}
            >
              Score
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("hnt-account")}>
            <a
              className={`nav-link ${tab === "hnt-account" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "hnt-account").toString()}
            >
              Cuenta HNT$
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("local-account")}>
            <a
              className={`nav-link ${tab === "local-account" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "local-account").toString()}
            >
              Cuenta Local
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("us-account")}>
            <a
              className={`nav-link ${tab === "us-account" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "us-account").toString()}
            >
              Cuenta US$
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("credit")}>
            <a
              className={`nav-link ${tab === "credit" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "credit").toString()}
            >
              Créditos Solicitados
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("document")}>
            <a
              className={`nav-link ${tab === "document" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "document").toString()}
            >
              Documentos
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("activities")}>
            <a
              className={`nav-link ${tab === "activities" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "activities").toString()}
            >
              Actividades
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("relations")}>
            <a
              className={`nav-link ${tab === "relations" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "relations").toString()}
            >
              Relaciones
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "client" && (
            <ClientEditForm
              client={initClientForEdit}
              btnRef={btnRef}
              urlImage={url}
              dni={clientIdentityForEdit.dni}
              setIsSubmitting={setIsSubmitting}
              saveClient={saveClient}
            />
          )}
          {tab === "identity" && (
            <IdentityEditForm
              clientIdentity={clientIdentityForEdit}
              btnRef={btnRef}
              setIsSubmitting={setIsSubmitting}
              saveClient={saveClient}
            />
          )}
          {tab === "score" && (
            <ScoreEditForm
              clientScore={scoreClientForEdit}
              btnRef={btnRef}
              setIsSubmitting={setIsSubmitting}
              saveClient={saveClient}
            />
          )}
          {tab === "hnt-account" && <AccountsListEdit data={accountHNT} />}
          {tab === "local-account" && (
            <AccountsListEdit data={accountAR} buttonCvu />
          )}
          {tab === "us-account" && <AccountsListEdit data={accountUS} />}
          {tab === "credit" && <RequestedCreditsList data={creditsRequested} />}
          {tab === "document" && (
            <DocumentList
              id={id}
              passport={client.client.passport}
              dni={client.identity.dni}
            />
          )}
          {tab === "activities" && <ActivitiesList activities={activities} />}
          {tab === "relations" && <RelationsList relations={relations} urlImage={url} />}
        </div>
      </CardBody>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </Card>
  );
}

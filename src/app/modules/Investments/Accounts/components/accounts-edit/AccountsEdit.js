/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useState, useRef} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { Button } from "@material-ui/core";
import { AccountEditForm } from "./Forms/AccountEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { PmtsEditForm } from "./Forms/PmtsEditForm";
import { accountMock } from "./accountFields";
import { MoreInfoEditForm } from "./Forms/MoreInfoEditForm";
import { ListingTableContextProviderAccounts } from "../Listings/ListingAccounts/ListingTableContext";
import ListingAccounts from "../Listings/ListingAccounts";
import ListingBanks from "../Listings/ListingBanks";
import { ListingTableContextProviderBanks } from "../Listings/ListingBanks/ListingTableContext";
import { ListingTableContextProviderPeople } from "../Listings/ListingPeolple/ListingTableContext";
import ListingPeople from "../Listings/ListingPeolple";

export function AccountEdit({history,match: {params: { id }}}) {
 
  const suhbeader = useSubheader();
  suhbeader.setTitle("Cuentas Comitentes");
  
  const [tab, setTab] = useState(history.location.state?.tab || "Datos de la cuenta");
  const btnRef = useRef();

  const { account } = accountMock;

  const backToClientsList = () => {
    history.push(`/investments/accounts`);
  };

  const saveClientClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const tabs = ["Datos de la cuenta", "Mas info", "pmt", "Personas", "Bancos", "Cuentas"]
  
  return (
    <Card>
      <CardHeader title="Editar Cuenta">
        <CardHeaderToolbar>
        <Button
            variant="outlined"
            color="secondary"
            className="ml-4"
            size="large"
            onClick={backToClientsList}
        >
            Volver
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          size="large"
          onClick={saveClientClick}
          >
            Actualizar
        </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          {
            tabs.map((e)=> {
              return (
                <li className="nav-item" onClick={() => setTab(e)} key={e}>
                  <a
                    className={`nav-link ${tab === e && "active"}`}
                    data-toggle="tab"
                    role="tab"
                    aria-selected={(tab === e).toString()}
                  >
                    {e}
                  </a>
                </li>
              )
            })
          }
        </ul>
        <div className="mt-5">
          {tab === "Datos de la cuenta" && (
            <AccountEditForm account={account}/>
          )}
          {tab === "Mas info" && (
            <MoreInfoEditForm account={account} />
          )}
          {tab === "pmt" && (
            <PmtsEditForm account={account}/>
          )}
          {tab === "Personas" && (
            <ListingTableContextProviderPeople>
              <ListingPeople />
            </ListingTableContextProviderPeople>
          )}
          {tab === "Bancos" && (
            <ListingTableContextProviderBanks>
              <ListingBanks />
            </ListingTableContextProviderBanks>
          )}
          {tab === "Cuentas" && (
            <ListingTableContextProviderAccounts>
              <ListingAccounts />
            </ListingTableContextProviderAccounts>
          )}
        </div>
      </CardBody>
    </Card>
  );
}


/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useState} from "react";

import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { CategoryTab } from "./CategoryTab";

export function NewCategoryPage({history}) {

   // Tabs
   const [tab, setTab] = useState("category");

  const backToComunicationsPage = () => {
    history.push(`/bcra/comunications`);
  };



  return (
    <Card>
      <CardHeader title="Categorias" />

      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("category")}>
            <a
              className={`nav-link ${tab === "category" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "category").toString()}
            >
              Categoría
            </a>
          </li>
        </ul>
        <div className="mt-5">
         
        {tab === "category" && (
          <CategoryTab
            backToComunication={backToComunicationsPage}
          />
        )}
        </div>
      </CardBody>
    </Card>
  );
}


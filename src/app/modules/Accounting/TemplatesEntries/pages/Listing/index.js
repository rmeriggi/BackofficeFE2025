import { GridOn, List } from "@material-ui/icons";
import React, { useState } from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { seatingTemplatesAdapter } from "../../adapters/seatingTemplatesAdapter";
import { useAllSeatingTemplates } from "../../utils/apiHook";
import ModernListingFilter from "./ModernListingFilter";
import ModernListingTable from "./ModernListingTable";
import ModernListingTableCards from "./ModernListingTableCards";

export default function Listing() {
  const isMounted = useIsMountedRef();
  const [viewMode, setViewMode] = useState("grid");

  const [
    seatingTemplatesData,
    seatingTemplatesCompleted,
  ] = useAllSeatingTemplates(isMounted);

  if (!seatingTemplatesCompleted) return <LayoutSplashScreen />;

  const data = seatingTemplatesAdapter(seatingTemplatesData);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-8">
        <h1 className="text-dark font-weight-bold my-1 fs-2hx">
          Plantillas de Asientos
        </h1>
        <div className="d-flex align-items-center">
          <button
            className={`btn btn-light btn-icon mr-2 ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
            title="Vista listado"
          >
            <List />
          </button>
          <button
            className={`btn btn-light btn-icon ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
            title="Vista cards"
          >
            <GridOn />
          </button>
        </div>
      </div>
      <ModernListingFilter disabled={data.length === 0} data={data} />
      {viewMode === "list" ? (
        <ModernListingTable seatingTemplates={data} />
      ) : (
        <ModernListingTableCards seatingTemplates={data} />
      )}
    </div>
  );
}

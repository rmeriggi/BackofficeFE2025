import { CircularProgress } from "@material-ui/core";
import {
  Add,
  FilterList,
  GetApp,
  GridOn,
  List,
  Search,
  Visibility,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { getBooksVista } from "../../../../../_redux/accounting/accountingCrud";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { AccountingEntriesModal } from "../components/modal/modal/AccountingEntriesModal";
import { ModalCreate } from "../components/modal/modalCreate/modalCreate";
import ListingFilter from "./ListingFilter";

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const initialValues = {
  fromDate: yesterday,
  toDate: new Date(),
  id_client: 125,
};

export default function Listing() {
  const [values, setValues] = useState(initialValues);
  const [accountingEntriesData, setAccountiengEntries] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [id, setId] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllAccountingEntries = async () => {
      setLoading(true);
      // Convertir las fechas a formato ISO string
      const apiValues = {
        ...values,
        fromDate: values.fromDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
        toDate: values.toDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
      };

      try {
        const accountingEntries = await getBooksVista(apiValues);

        // Validar que los datos tengan la estructura correcta
        if (
          accountingEntries &&
          accountingEntries.asientos &&
          Array.isArray(accountingEntries.asientos)
        ) {
          setAccountiengEntries(accountingEntries);
        } else {
          setAccountiengEntries({ asientos: [] });
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setAccountiengEntries({ asientos: [] });
      } finally {
        setLoading(false);
      }
    };
    getAllAccountingEntries();
  }, [values]);

  const openDetailsModal = (id) => {
    setId(id);
    setShowModal(true);
  };

  const closeDetailsModal = () => {
    setShowModal(false);
  };

  const openCreateModal = () => {
    setShowModalCreate(true);
  };

  const closeCreateModal = () => {
    setShowModalCreate(false);
  };

  const handleDownloadExcel = () => {
    if (
      !accountingEntriesData ||
      !Array.isArray(accountingEntriesData.asientos)
    ) {
      console.error("Error: No hay datos para exportar");
      return;
    }

    const visibleData = accountingEntriesData.asientos.map((entry) => {
      const totalDebit = entry.data.reduce((sum, item) => sum + item.debit, 0);
      const totalCredit = entry.data.reduce(
        (sum, item) => sum + item.credit,
        0
      );

      return {
        ID: entry.id,
        Fecha: entry.date,
        Descripción: entry.data.map((d) => d.description).join("; "),
        "Total Debe": totalDebit,
        "Total Haber": totalCredit,
        Balance: totalDebit - totalCredit,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(visibleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asientos Contables");
    XLSX.writeFile(workbook, "Asientos_Contables.xlsx");
  };

  // Procesar datos para la vista
  const processedData =
    accountingEntriesData && accountingEntriesData.asientos
      ? accountingEntriesData.asientos.map((entry) => {
          let totalDebit = 0;
          let totalCredit = 0;
          entry.data.forEach((item) => {
            totalDebit += item.debit;
            totalCredit += item.credit;
          });
          return {
            ...entry,
            totalDebit,
            totalCredit,
            balance: totalDebit - totalCredit,
          };
        })
      : [];

  if (accountingEntriesData === undefined) return <LayoutSplashScreen />;

  return (
    <div className="container-fluid">
      {/* Encabezado y acciones */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
              Asientos Contables
            </h1>
            <p className="text-white-75 font-size-lg mb-0">
              Gestión y visualización de asientos contables
            </p>
          </div>
          <div className="d-flex align-items-center">
            {processedData.length > 0 && (
              <button
                className="btn btn-light text-dark btn-icon mr-2"
                onClick={handleDownloadExcel}
                title="Exportar a Excel"
              >
                <GetApp style={{ color: "#c3c3c3" }} />
              </button>
            )}
            <button
              className="btn btn-light text-dark btn-icon mr-2"
              onClick={() => setShowFilters(!showFilters)}
              title="Mostrar/Ocultar filtros"
            >
              <FilterList style={{ color: "#c3c3c3" }} />
            </button>
            <button
              className="btn btn-light text-dark btn-icon mr-2"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
            >
              {viewMode === "grid" ? (
                <List style={{ color: "#c3c3c3" }} />
              ) : (
                <GridOn style={{ color: "#c3c3c3" }} />
              )}
            </button>
            <button
              className="btn btn-light-primary font-weight-bold"
              onClick={openCreateModal}
            >
              <Add className="mr-1" />
              Nuevo Asiento
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="card card-custom gutter-b mb-8">
          <div className="card-body bg-light-info pt-6 pb-4 px-8">
            <ListingFilter
              disabled={
                !accountingEntriesData ||
                !accountingEntriesData.asientos ||
                accountingEntriesData.asientos.length === 0
              }
              data={accountingEntriesData || { asientos: [] }}
              setValues={setValues}
              values={values}
              openCreateModal={openCreateModal}
            />
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "400px" }}
        >
          <CircularProgress size={40} color="secondary" />
        </div>
      )}

      {/* Listado de registros */}
      {!loading && (
        <>
          {viewMode === "grid" ? (
            <div className="row">
              {processedData.map((entry) => (
                <div
                  key={entry.id}
                  className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
                >
                  <div className="card card-custom gutter-b shadow-sm border-left-primary">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <div>
                          <h4 className="text-dark font-weight-bolder mb-0">
                            Asiento #{entry.id}
                          </h4>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted font-weight-bold mr-2">
                              Fecha: {DateColumnFormatter(entry.date)}
                            </span>
                            <span className="text-muted font-weight-bold">
                              {entry.data.length} líneas
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-5">
                        <div className="col-6">
                          <div className="d-flex flex-column">
                            <span className="text-muted font-weight-bold mb-1">
                              Total Debe
                            </span>
                            <span className="text-success font-weight-bolder font-size-h5">
                              {AmountColumnFormatter(entry.totalDebit)}
                            </span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex flex-column">
                            <span className="text-muted font-weight-bold mb-1">
                              Total Haber
                            </span>
                            <div className="d-flex align-items-center">
                              <span className="text-danger font-weight-bolder font-size-h5 mr-2">
                                {AmountColumnFormatter(entry.totalCredit)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Balance
                          </span>
                          <span
                            className={`font-weight-bolder font-size-h5 ${
                              entry.balance === 0
                                ? "text-success"
                                : "text-warning"
                            }`}
                          >
                            {AmountColumnFormatter(entry.balance)}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end align-items-center">
                        <button
                          onClick={() => openDetailsModal(entry.id)}
                          className="btn btn-sm btn-light-primary"
                        >
                          <Visibility className="mr-1" />
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card card-custom gutter-b">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-head-custom table-vertical-center overflow-hidden">
                    <thead>
                      <tr>
                        <th className="pl-7">
                          <span className="text-dark-75">ID</span>
                        </th>
                        <th>
                          <span className="text-dark-75">Fecha</span>
                        </th>
                        <th>
                          <span className="text-dark-75">Descripción</span>
                        </th>
                        <th>
                          <span className="text-dark-75">Total Debe</span>
                        </th>
                        <th>
                          <span className="text-dark-75">Total Haber</span>
                        </th>
                        <th>
                          <span className="text-dark-75">Balance</span>
                        </th>
                        <th>
                          <span className="text-dark-75">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.map((entry) => (
                        <tr key={entry.id} className="border-bottom">
                          <td className="pl-7">
                            <span className="text-dark font-weight-bolder">
                              #{entry.id}
                            </span>
                          </td>
                          <td>
                            <span className="text-dark font-weight-bolder">
                              {DateColumnFormatter(entry.date)}
                            </span>
                          </td>
                          <td>
                            <span className="text-dark font-weight-bolder">
                              {entry.data[0]?.description || "Sin descripción"}
                            </span>
                          </td>
                          <td>
                            <span className="text-success font-weight-bolder">
                              {AmountColumnFormatter(entry.totalDebit)}
                            </span>
                          </td>
                          <td>
                            <span className="text-danger font-weight-bolder">
                              {AmountColumnFormatter(entry.totalCredit)}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`font-weight-bolder ${
                                entry.balance === 0
                                  ? "text-success"
                                  : "text-warning"
                              }`}
                            >
                              {AmountColumnFormatter(entry.balance)}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => openDetailsModal(entry.id)}
                              className="btn btn-sm btn-light-primary"
                              title="Ver detalles"
                            >
                              <Visibility />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sin resultados */}
          {processedData.length === 0 && !loading && (
            <div className="card card-custom gutter-b">
              <div className="card-body d-flex flex-column align-items-center py-20">
                <div className="symbol symbol-100 symbol-light-primary mb-5">
                  <span className="symbol-label">
                    <Search style={{ fontSize: 50, color: "#3699FF" }} />
                  </span>
                </div>
                <h3 className="text-dark font-weight-bolder mb-2">
                  No se encontraron asientos contables
                </h3>
                <p className="text-muted font-weight-bold mb-10">
                  Intenta ajustar tus filtros de fecha o crear un nuevo asiento
                </p>
                <button
                  className="btn btn-primary font-weight-bold"
                  onClick={openCreateModal}
                >
                  Crear nuevo asiento
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modales */}
      {showModal && (
        <AccountingEntriesModal
          show={showModal}
          onHide={closeDetailsModal}
          idEntryDetail={id}
        />
      )}
      {showModalCreate && (
        <ModalCreate show={showModalCreate} onHide={closeCreateModal} />
      )}
    </div>
  );
}

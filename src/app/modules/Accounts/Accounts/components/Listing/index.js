import { CircularProgress } from "@material-ui/core";
import {
  Description,
  FilterList,
  GridOn,
  List,
  Search,
  Visibility,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCurrencies } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { getExcel } from "../../../../../utils/exportExcel";
import { formatAmountReport } from "../../../../../utils/formatData";
import { CurrenciesEnum } from "../../utils/currenciesEnum";
import { getAllAccountsList } from "../../utils/service";
import { useListingTableContext } from "./ListingTableContext";

const filterData = (accountsData, filter) => {
  let filteredData = accountsData;
  if (
    filter &&
    (filter.alias !== "" ||
      filter.bussinesName !== "" ||
      filter.cvu !== "" ||
      filter.cuit !== "")
  ) {
    filteredData = accountsData.filter((account) => {
      const searchTerm = (
        filter.alias ||
        filter.bussinesName ||
        filter.cvu ||
        filter.cuit ||
        ""
      ).toLowerCase();

      if (
        (account.alias?.toString() || "").toLowerCase().includes(searchTerm) ||
        (account.bussinesName?.toString() || "")
          .toLowerCase()
          .includes(searchTerm) ||
        (account.cvu?.toString() || "").toLowerCase().includes(searchTerm) ||
        (account.cuit?.toString() || "").toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export default function Listing() {
  const history = useHistory();
  const [accountsData, setAccountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    searchText: "",
    idCurrency: 2,
  });
  const [currencies] = useFetchCombos("currencies", getCurrencies);

  const {
    queryParams,
    setQueryParams,
    setPageNumber,
    size,
    pageNumber,
  } = useListingTableContext();

  useEffect(() => {
    async function getAllAccountsAPI() {
      const res = await getAllAccountsList(CurrenciesEnum.PESOS);
      setAccountsData(res.allAccounts);
      setLoading(false);
    }
    getAllAccountsAPI();
  }, []);

  // Filtros y búsqueda
  const filteredData = filterData(accountsData, queryParams.filter);

  // Paginación
  const itemsPerPage = size;
  const currentPage = pageNumber;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const openAccountTableView = (id) => {
    history.push(`/accounts/accounts/view/${id}`);
  };

  const openExtract = (id) => {
    history.push(`/accounts/accounts/extract/${id}`);
  };

  const applyFilter = () => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.alias = localFilters.searchText || "";
    filter.bussinesName = localFilters.searchText || "";
    filter.cvu = localFilters.searchText || "";
    filter.cuit = localFilters.searchText || "";
    newQueryParams.filter = filter;

    setPageNumber(1);
    newQueryParams.pageNumber = 1;
    setQueryParams(newQueryParams);
  };

  const clearFilters = () => {
    const clearedFilters = {
      searchText: "",
      idCurrency: 2,
    };
    setLocalFilters(clearedFilters);

    const newQueryParams = { ...queryParams };
    newQueryParams.filter = {
      alias: "",
      bussinesName: "",
      cvu: "",
      cuit: "",
    };
    setPageNumber(1);
    newQueryParams.pageNumber = 1;
    setQueryParams(newQueryParams);
  };

  const changeCurrency = async (currencyId) => {
    setLoading(true);
    const response = await getAllAccountsList(currencyId);
    const formatedData = formatAmountReport(response.allAccounts);
    setAccountsData(formatedData);
    setLoading(false);
  };

  const exportToExcel = () => {
    const reportData = formatAmountReport(accountsData);
    const propertiesData = {
      header: ["Cuit", "Razón social", "Alias", "cvu", "saldo"],
      properties: ["cuit", "bussinesName", "alias", "cvu", "amount"],
      array: reportData,
    };
    getExcel(propertiesData, "Cuentas");
  };

  if (loading && accountsData.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <CircularProgress size={40} color="secondary" />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Encabezado y acciones */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
              Cuentas
            </h1>
            <p className="text-white-75 font-size-lg mb-0">
              Gestión y monitoreo de cuentas bancarias
            </p>
          </div>
          <div className="d-flex align-items-center">
            {accountsData.length > 0 && (
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={exportToExcel}
                title="Exportar a Excel"
              >
                <i className="flaticon2-download text-white"></i>
              </button>
            )}
            <button
              className="btn btn-light btn-icon mr-2"
              onClick={() => setShowFilters(!showFilters)}
              title="Mostrar/Ocultar filtros"
            >
              <FilterList />
            </button>
            <button
              className="btn btn-light btn-icon mr-2"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
            >
              {viewMode === "grid" ? <List /> : <GridOn />}
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="card card-custom gutter-b mb-8">
          <div className="card-body bg-light-info pt-6 pb-4 px-8">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-4">
                <div className="input-icon input-icon-right">
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Buscar por CUIT, razón social, alias, CVU..."
                    value={localFilters.searchText}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        searchText: e.target.value,
                      })
                    }
                  />
                  <span>
                    <Search style={{ color: "#7E8299" }} />
                  </span>
                </div>
              </div>
              <div className="col-lg-3">
                <select
                  className="form-control form-control-solid"
                  value={localFilters.idCurrency}
                  onChange={(e) => {
                    const currencyId = parseInt(e.target.value);
                    setLocalFilters({
                      ...localFilters,
                      idCurrency: currencyId,
                    });
                    changeCurrency(currencyId);
                  }}
                >
                  {currencies?.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.currency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-3">
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-primary font-weight-bold mr-2"
                    onClick={applyFilter}
                  >
                    Aplicar Filtros
                  </button>
                  <button
                    type="button"
                    className="btn btn-light-primary font-weight-bold"
                    onClick={clearFilters}
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listado de registros */}
      {viewMode === "grid" ? (
        <div className="row">
          {currentItems.map((account) => (
            <div
              key={account.id}
              className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
            >
              <div className="card card-custom gutter-b shadow-sm border-left-primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <h4 className="text-dark font-weight-bolder mb-0">
                        {account.bussinesName}
                      </h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted font-weight-bold mr-2">
                          CUIT: {account.cuit}
                        </span>
                        <span className="text-muted font-weight-bold">
                          Alias: {account.alias}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          CVU
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {account.cvu}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Saldo
                        </span>
                        <div className="d-flex align-items-center">
                          <span className="text-dark font-weight-bolder font-size-h5 mr-2">
                            {AmountColumnFormatter(account.amount)}
                          </span>
                          {/* <span className="text-muted font-weight-bold">
                            ({account.alias})
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end align-items-center mb-5">
                    <div className="d-flex">
                      <button
                        onClick={() => openAccountTableView(account.id)}
                        className="btn btn-sm btn-light-primary mr-2"
                      >
                        <Visibility className="mr-1" />
                        Ver
                      </button>
                      <button
                        onClick={() => openExtract(account.id)}
                        className="btn btn-sm btn-light-warning"
                      >
                        <Description className="mr-1" />
                        Extracto
                      </button>
                    </div>
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
                      <span className="text-dark-75">CUIT</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Razón Social</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Alias</span>
                    </th>
                    <th>
                      <span className="text-dark-75">CVU</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Saldo</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((account) => (
                    <tr key={account.id} className="border-bottom">
                      <td className="pl-7">
                        <span className="text-dark font-weight-bolder">
                          {account.cuit}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {account.bussinesName}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {account.alias}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {account.cvu}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {AmountColumnFormatter(account.amount)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() => openAccountTableView(account.id)}
                            className="btn btn-sm btn-light-primary mr-2"
                            title="Ver detalles"
                          >
                            <Visibility />
                          </button>
                          <button
                            onClick={() => openExtract(account.id)}
                            className="btn btn-sm btn-light-warning"
                            title="Ver extracto"
                          >
                            <Description />
                          </button>
                        </div>
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
      {filteredData.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron cuentas
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={clearFilters}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Paginación */}
      {filteredData.length > 0 && (
        <div className="card card-custom mt-8">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="text-muted font-weight-bold mr-4">
                Mostrando {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredData.length)} de{" "}
                {filteredData.length} cuentas
              </span>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-icon btn-sm btn-light mr-2"
                disabled={currentPage === 1}
                onClick={() => setPageNumber(currentPage - 1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="text-dark font-weight-bold mx-3">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="btn btn-icon btn-sm btn-light ml-2"
                disabled={currentPage === totalPages}
                onClick={() => setPageNumber(currentPage + 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import * as requestFromServer from "./combosCrud";
import * as requestFromNotificationsServer from "../notifications/notificationsCrud";
import {combosSlice, callTypes} from "./combosSlice";

const {actions} = combosSlice;

export const getCurrencies = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.currencies }));
  return requestFromServer
    .getCurrencies()
    .then(response => {
      const { currency } = response;
      dispatch(actions.currenciesFetched( {currency} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.currenciesFetched([]));
    });
}

export const getEntities = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.entities }));
  return requestFromServer
    .getEntities()
    .then(response => {
      const { entities } = response;
      dispatch(actions.entitiesFetched( {entities} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.entitiesFetched([]));
    });
}

export const getCountries = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.countries }));
  return requestFromServer
    .getCountries()
    .then(response => {
      const { countries } = response;
      dispatch(actions.countriesFetched( {countries} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.countriesFetched([]));
    });
}

export const getWallets = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.wallets }));
  return requestFromServer
    .getWallets()
    .then(response => {      
      const  wallets  = response;
      dispatch(actions.walletsFetched( {wallets} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.walletsFetched([]));
    });
}

export const getOperations = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.operations }));
  return requestFromServer
    .getOperations()
    .then(response => {
      const  operations  = response;      
      dispatch(actions.operationsFetched( {operations} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.operationsFetched([]));
    });
}

export const getSpecies = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.species }));
  return requestFromServer
    .getSpecies()
    .then(response => {
      const species  = response;
      dispatch(actions.speciesFetched( {species} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.speciesFetched([]));
    });
}

export const getDeadline = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.deadline }));
  return requestFromServer
    .getDeadline()
    .then(response => {
      const deadlines  = response;
      dispatch(actions.deadlineFetched( {deadlines} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.deadlineFetched([]));
    });
}

export const getCounterparties = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.counterparties }));
  return requestFromServer
    .getCounterparties()
    .then(response => {
      const counterparties = response;
      dispatch(actions.counterpartiesFetched( {counterparties} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.counterpartiesFetched([]));
    });
}

export const getMarkets = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.markets }));
  return requestFromServer
    .getMarkets()
    .then(response => {
      const markets = response;
      dispatch(actions.marketsFetched( {markets} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.marketsFetched([]));
    });
}

export const getOperators = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.operators }));
  return requestFromServer
    .getOperators()
    .then(response => {
      const operators = response;
      dispatch(actions.operatorsFetched( {operators} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.operatorsFetched([]));
    });
}

export const getCoins = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.coins }));
  return requestFromServer
    .getCoins()
    .then(response => {
      const coins  = response;
      dispatch(actions.coinsFetched( {coins} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.coinsFetched([]));
    });
}

export const getStatus = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.status }));
  return requestFromNotificationsServer
    .statusNotifications()
    .then(response => {
      const status  = response;
      dispatch(actions.statusFetched( {status} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.statusFetched([]));
    });
}

export const getCategories = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.status }));
  return requestFromServer
    .getSuppliersCategory()
    .then(response => {
      const categories  = response;
      dispatch(actions.categoriesFetched( {categories} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.categoriesFetched([]));
    });
}

export const getCostCenters = () => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.status }));
  return requestFromServer
    .getSuppliersCC()
    .then(response => {
      const costCenters  = response;
      dispatch(actions.costCentersFetched( {costCenters} ));
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.costCentersFetched([]));
    });
}
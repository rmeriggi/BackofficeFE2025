import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest, select, call } from "redux-saga/effects";
import { parseJwt } from '../utils/parseJWT'
import { getMenu } from "./authCrud";
export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
  DecodeUserData: "[Decode User] Action",
  SetMenu: "[Set Menu] Action",
  SetAccess: "[Set Access] Action",
};
const initialAuthState = {
  user: undefined,
  authToken: undefined,
  menu: [],
  access: {},
};
export const reducer = persistReducer(
  { storage, key: "v726-hnt-bank-auth", whitelist: ["authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;
        return { authToken, user: undefined };
      }
      case actionTypes.Register: {
        const { authToken } = action.payload;
        return { authToken, user: undefined };
      }
      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }
      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.SetMenu: {
        const { menu } = action.payload;
        return { ...state, menu };
      }
      case actionTypes.SetAccess: {
        const { access } = action.payload;
        return { ...state, access };
      }
      default:
        return state;
    }
  }
);
export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  decodeUserData: () => ({
    type: actionTypes.DecodeUserData,
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  setMenu: (menu) => ({ type: actionTypes.SetMenu, payload: { menu }}),
  setAccess: (access) => ({ type: actionTypes.SetAccess, payload: { access }}),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.decodeUserData());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.decodeUserData());
  });

  yield takeLatest(actionTypes.DecodeUserData, function* decodeUserData() {
    const token = yield select(state => state.auth.authToken);
    yield put(actions.fulfillUser(parseJwt(token)));
  });

  yield takeLatest(actionTypes.UserLoaded, function* getMenuSaga() {
    const user = yield select(state => state.auth.user);
    if (user && user.id) {
      const menuResponse = yield call(getMenu, user.id);
      const access = {};
      menuResponse.data.menu.forEach(menuItem => {
        access[menuItem.itemActive] = menuItem.access;
        menuItem.subMenu.forEach(subMenuItem => {
          access[menuItem.itemActive + '.' + subMenuItem.name] = subMenuItem.access;
        })
      })
      yield put(actions.setMenu(menuResponse.data.menu));
      yield put(actions.setAccess(access));
    }
  });

}

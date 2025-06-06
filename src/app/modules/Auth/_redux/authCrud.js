import axios from "axios";

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/login`;
export const MENU_URL = (id) => `${process.env.REACT_APP_API_URL}/menu/${id}`;

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function getMenu(userId) {
  return axios.get(MENU_URL(userId));
}
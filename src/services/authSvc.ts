import axios from "axios";

import { a } from "./httpSvc";

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const login = async () => {
  try {
    const data = await axios.request({
      url: `${SERVER_URL}/token`,
      method: "post",

      data: {
        username: "janek",
        password: "alamakota",
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const setToken = (tokenObj: any) => {
  localStorage.setItem("access_token", tokenObj);
  //   localStorage.setItem("refresh_token", tokenObj.refresh_token);
};
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const clearToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

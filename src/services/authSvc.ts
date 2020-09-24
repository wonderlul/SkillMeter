import axios from "axios";

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const login = async () => {
  axios
    .request({
      url: `${SERVER_URL}/token`,
      method: "post",

      data: {
        username: "janek",
        password: "alamakota",
      },
    })
    .then(function (res) {
      console.log(res);
    });
};

import axios from "axios";
const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const getAllEmployees = async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/employees`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

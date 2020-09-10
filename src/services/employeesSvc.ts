import axios from "axios";
import { IEmployee } from "../models/IEmployee";
const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const getAllEmployees = async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/employees`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployee = async (id: string) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/employees/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addEmployee = async (employee: IEmployee) => {
  try {
    const { data } = await axios.post(`${SERVER_URL}/employees`, employee);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (id: string, employee: IEmployee) => {
  try {
    const { data } = await axios.patch(
      `${SERVER_URL}/employees/${id}`,
      employee
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const { data } = await axios.delete(`${SERVER_URL}/employees/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

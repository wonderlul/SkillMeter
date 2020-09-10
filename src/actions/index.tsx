import { IEmployee } from "../models/IEmployee";

export const ACTION_TYPES = {
  GET_EMPLOYEE_REQUESTED: "GET_EMPLOYEE_REQUESTED",
  GET_EMPLOYEE_DONE: "GET_EMPLOYEE_DONE",
  GET_EMPLOYEE_FAILED: "GET_EMPLOYEE_FAILED",
  ADD_EMPLOYEE_REQUESTED: "ADD_EMPLOYEE_REQUESTED",
  ADD_EMPLOYEE_DONE: "ADD_EMPLOYEE_DONE",
  ADD_EMPLOYEE_FAILED: "ADD_EMPLOYEE_FAILED",
};

export interface IManageEmployee {
  type: string;
  payload?: IEmployee | string;
}

export type TFormAction = IManageEmployee;

export const getEmployeeRequested = (): TFormAction => ({
  type: ACTION_TYPES.GET_EMPLOYEE_REQUESTED,
});

export const getEmployeeDone = (data: IEmployee): TFormAction => ({
  type: ACTION_TYPES.GET_EMPLOYEE_DONE,
  payload: data,
});

export const getEmployeeFailed = (error: string): TFormAction => ({
  type: ACTION_TYPES.GET_EMPLOYEE_FAILED,
  payload: error,
});

export const getEmployee = (data: IEmployee) => {
  return async (dispatch: any) => {
    try {
      setTimeout(() => console.log(data), 5000);
    } catch (error) {}
  };
};

export const addEmployeeRequested = (data: IEmployee): TFormAction => ({
  type: ACTION_TYPES.ADD_EMPLOYEE_REQUESTED,
  payload: data,
});

export const addEmployeeDone = (): TFormAction => ({
  type: ACTION_TYPES.ADD_EMPLOYEE_DONE,
});

export const addEmployeeFailed = (error: string): TFormAction => ({
  type: ACTION_TYPES.ADD_EMPLOYEE_FAILED,
  payload: error,
});

export const addEmployee = (data: IEmployee) => {
  return async (dispatch: any) => {
    try {
      setTimeout(() => console.log(data), 5000);
    } catch (error) {
      console.log(error.message);
    }
  };
};

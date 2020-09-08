import { ACTION_TYPES, TFormAction } from "../../actions";
import { IEmployee, ELevels, EPositions } from "../../models/IEmployee";

export interface IFormState {
  employeeData: IEmployee;
  fetchStatus: EStatus;
  postStatus: EStatus;
}

export enum EStatus {
  LOADING = "LOADING",
  DONE = "DONE",
  FAILED = "FAILED",
}

const initialState: IFormState = {
  employeeData: {
    name: "",
    surname: "",
    startWorkDate: "",
    evaluationDate: "",
    level: ELevels.NOT_DEFINED,
    position: EPositions.NOT_DEFINED,
    project: "",
  },
  fetchStatus: EStatus.LOADING,
  postStatus: EStatus.LOADING,
};

export default (state = initialState, action: TFormAction) => {
  switch (action.type) {
    case ACTION_TYPES.GET_EMPLOYEE_REQUESTED:
      return {
        ...state,
        fetchStatus: EStatus.LOADING,
      };

    case ACTION_TYPES.GET_EMPLOYEE_DONE:
      return {
        ...state,
        fetchStatus: EStatus.DONE,
        employeeData: action.payload,
      };

    case ACTION_TYPES.GET_EMPLOYEE_FAILED:
      return {
        ...state,
        fetchStatus: EStatus.FAILED,
      };

    case ACTION_TYPES.ADD_EMPLOYEE_REQUESTED:
      return {
        ...state,
        postStatus: EStatus.LOADING,
        employeeData: action.payload,
      };

    case ACTION_TYPES.ADD_EMPLOYEE_DONE:
      return {
        ...state,
        postStatus: EStatus.DONE,
      };

    case ACTION_TYPES.ADD_EMPLOYEE_FAILED:
      return {
        ...state,
        postStatus: EStatus.FAILED,
      };

    default:
      return state;
  }
};

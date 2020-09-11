import { ACTION_TYPES, TFormAction } from "../../actions";
import { EStatus, EOperation } from "../../models/IFormState";

// const initialState: IFormState = {
//   employeeData: {
//     name: "",
//     surname: "",
//     startWorkDate: "",
//     evaluationDate: "",
//     level: ELevels.NOT_DEFINED,
//     position: EPositions.NOT_DEFINED,
//     project: "",
//   },
//   OPERATION_STATUS: EStatus.LOADING,
//   OPERATION_TYPE: EOperation.ADD,
// };

export default (state = [], action: TFormAction) => {
  switch (action.type) {
    case ACTION_TYPES.GET_EMPLOYEE_REQUESTED:
      return {
        ...state,
        OPERATION_TYPE: EOperation.GET,
        OPERATION_STATUS: EStatus.LOADING,
      };

    case ACTION_TYPES.GET_EMPLOYEE_DONE:
      return {
        ...state,
        OPERATION_STATUS: EStatus.DONE,
        employeeData: action.payload,
      };

    case ACTION_TYPES.GET_EMPLOYEE_FAILED:
      return {
        ...state,
        OPERATION_STATUS: EStatus.FAILED,
      };

    case ACTION_TYPES.ADD_EMPLOYEE_REQUESTED:
      return {
        ...state,
        OPERATION_TYPE: EOperation.GET,
        OPERATION_STATUS: EStatus.LOADING,
        employeeData: action.payload,
      };

    case ACTION_TYPES.ADD_EMPLOYEE_DONE:
      return {
        ...state,
        OPERATION_STATUS: EStatus.DONE,
      };

    case ACTION_TYPES.ADD_EMPLOYEE_FAILED:
      return {
        ...state,
        OPERATION_STATUS: EStatus.FAILED,
      };

    default:
      return state;
  }
};

import React from "react";

import Form from "./Form";
import CEmployeesTable from "../components/CEmployeesTable/CEmployeesTable";

import { employees } from "../components/CEmployeesTable/CEmployeesTable.stories";

export const Employees = () => {
  return (
    <>
      <CEmployeesTable employees={employees} />
    </>
  );
};

export default Employees;

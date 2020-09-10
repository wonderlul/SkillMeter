import React, { useState, useEffect } from "react";

import Form from "./Form";
import CEmployeesTable from "../components/CEmployeesTable/CEmployeesTable";

// import { employees } from "../components/CEmployeesTable/CEmployeesTable.stories";
import { getAllEmployees } from "../services/employeesSvc";
import { IEmployee } from "../models/IEmployee";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);

  let employeesData: IEmployee[] = [];

  (async () => {
    employeesData = await getAllEmployees();
  })();

  useEffect(() => {
    setEmployees(employeesData);
  }, [employeesData]);

  return (
    <>
      <CEmployeesTable employees={employees} />
    </>
  );
};

export default Employees;

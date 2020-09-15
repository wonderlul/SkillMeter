import React, { useState, useEffect } from "react";

import CEmployeesTable from "../components/CEmployeesTable/CEmployeesTable";

import { getAllEmployees } from "../services/employeesSvc";
import { IEmployee, IGetEmployees } from "../models/IEmployee";

export const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employeesAmount, setEmployeesAmount] = useState(0);

  const [page, setPage] = useState(1);
  const pageHandler = (page: number) => {
    setPage(page);
  };

  const [flag, setFlag] = useState(false);
  const flagHandler = () => {
    setFlag(!flag);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      try {
        const employeesData: IGetEmployees = await getAllEmployees(page);

        setEmployees(employeesData.employees);
        setEmployeesAmount(employeesData.count);
      } catch (error) {
        console.log(error);
      }
    })();
    setFlag(false);
  }, [flag]);

  return (
    <>
      <CEmployeesTable
        employees={employees}
        employeesAmount={employeesAmount}
        pageHandler={pageHandler}
        flagHandler={flagHandler}
      />
    </>
  );
};

export default Employees;

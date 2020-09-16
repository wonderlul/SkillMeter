import React, { useState, useEffect } from "react";

import CEmployeesList from "../../components/CEmployeesList/CEmployeesList";

import { getAllEmployees } from "../../services/employeesSvc";
import { IEmployee, IGetEmployees } from "../../models/IEmployee";
import { Button, PageHeader } from "antd";

import { useHistory } from "react-router-dom";

export const Employees = () => {
  const history = useHistory();

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
      <PageHeader
        className="site-page-header"
        title="Employees"
        extra={
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              history.push("employees/add");
            }}
          >
            Add employee
          </Button>
        }
      />
      <CEmployeesList
        employees={employees}
        employeesAmount={employeesAmount}
        pageHandler={pageHandler}
        flagHandler={flagHandler}
      />
    </>
  );
};

export default Employees;

import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";

import { IEmployee } from "../../models/IEmployee";

import { Tag, Table, Avatar, Button, Modal, notification } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import styles from "./CEmployeesList.module.scss";

import {
  deleteEmployee,
  levelsMap,
  positionsMap,
} from "../../services/employeesSvc";

const getYear = (date: string) => new Date(date).getFullYear();
const getFullDate = (date: string) => new Date(date).toLocaleDateString();

const CEmployeesList: FC<{
  getEmployeesData: Function;
  employees: IEmployee[];
  employeesAmount: number;
}> = ({ getEmployeesData, employees, employeesAmount }) => {
  const employeeData = employees.map((employee, index) => ({
    id: employee._id,
    key: `${index}${employee.name}`,
    photo: employee.photo,
    name: employee.name,
    surname: employee.surname,
    startWorkDate: getYear(employee.startWorkDate),
    evaluationDate: getFullDate(employee.evaluationDate),
    tags: employee.tags,
    level: levelsMap(employee.level).value,
    position: positionsMap(employee.position).value,
    project: employee.project,
  }));

  const [userToDelete, setUserToDelete] = useState<typeof employeeData[0]>();

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      width: 80,
      render: (photo: string) => {
        return photo ? (
          <Avatar shape="square" size="large" src={photo} />
        ) : (
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      width: 100,
    },
    {
      title: "Started working",
      dataIndex: "startWorkDate",
      width: 150,
      // defaultSortOrder: "descend",
      // sorter: {
      //   compare: (a: any, b: any) => {
      //     return a.startWorkDate - b.startWorkDate;
      //   },
      //   multiple: 1,
      //   sortDirections: ["descend", "ascend"],
      // },
    },
    {
      title: "Last evaluation",
      dataIndex: "evaluationDate",
      width: 150,
    },
    {
      title: "Project",
      dataIndex: "project",
      width: 100,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: 100,
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="green" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      width: 100,
    },
    {
      title: "Position",
      dataIndex: "position",
      width: 100,
    },
    {
      title: "Actions",
      dataIndex: "id",

      width: 150,
      render: (id: string, record: typeof employeeData[0]) => (
        <>
          <NavLink to={`/employees/${id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </NavLink>
          <Button
            style={{ marginLeft: 5 }}
            type="ghost"
            danger
            onClick={() => {
              setUserToDelete(record);
            }}
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];

  const openNotificationFailed = () =>
    notification.error({
      message: "Error!",
      description: "Something went wrong. Please try again. ",
    });

  const openNotificationSuccess = (user: typeof employeeData[0]): void => {
    notification.success({
      message: "Success!",
      description: `You have successfully deleted employee ${user.name} ${user.surname}! `,
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <Modal
        title="Delete employee"
        visible={!!userToDelete}
        onOk={async () => {
          const deletedEmployee = await deleteEmployee(userToDelete?.id!);

          if (deletedEmployee) {
            openNotificationSuccess(userToDelete!);
          } else {
            openNotificationFailed();
          }
          setUserToDelete(undefined);
          getEmployeesData();
        }}
        onCancel={() => {
          setUserToDelete(undefined);
        }}
      >
        <p>
          Are you sure you want to delete employee {userToDelete?.name}
          {userToDelete?.surname}?
        </p>
      </Modal>

      <Table
        columns={columns}
        dataSource={employeeData}
        pagination={{
          pageSize: 5,
          total: employeesAmount,
          onChange: (page) => {
            getEmployeesData(page);
          },
        }}
      />
    </div>
  );
};

export default CEmployeesList;

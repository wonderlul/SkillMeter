import React, { FC, PropsWithChildren } from "react";
import { IEmployee, ELevels } from "../../models/IEmployee";
import { Tag, Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  CUserSignature,
  IUserSignature,
} from "../CUserSignature/CUserSignature";

export const CEmployeesTable: FC<PropsWithChildren<{
  employees: IEmployee[];
}>> = ({ employees }) => {
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
      // render: (employee: IUserSignature) => <CUserSignature {...employee} />,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      width: 100,
    },
    {
      title: "Start working",
      dataIndex: "startWorkDate",
      width: 100,
      defaultSortOrder: "descend",
      sorter: (a, b) => Number(a.startWorkDate) - Number(b.startWorkDate),
    },
    {
      title: "Last evaluation",
      dataIndex: "evaluationDate",
      width: 100,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: 150,
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
      width: 150,
    },
  ];

  const formatDate = (date: Date) =>
    `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  const data = employees.map((employee, index) => ({
    key: index,
    photo: employee.photo,
    name: employee.name,
    surname: employee.surname,
    startWorkDate: employee.startWorkDate.getFullYear(),
    evaluationDate: formatDate(employee.evaluationDate),
    tags: employee.tags,
    level: employee.level,
    position: employee.position,
  }));
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      // scroll={{ y: 240 }}
    />
  );
};

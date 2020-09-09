import React, { FC, PropsWithChildren } from "react";
import { IEmployee, ELevels } from "../../models/IEmployee";
import { Tag, Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const CEmployeesTable: FC<PropsWithChildren<{
  employees: IEmployee[];
}>> = ({ employees }) => {
  const getYear = (date: string) => new Date(date).getFullYear();

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
      title: "Start working",
      dataIndex: "startWorkDate",
      width: 100,
      defaultSortOrder: "descend",
      sorter: {
        compare: (a: any, b: any) => {
          console.log(typeof a);
          return a.startWorkDate - b.startWorkDate;
        },
      },
    },
    {
      title: "Last evaluation",
      dataIndex: "evaluationDate",
      width: 100,
    },
    {
      title: "Project",
      dataIndex: "project",
      width: 150,
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
  // function onChange(pagination, filters, sorter, extra) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }
  const getFullDate = (date: string) => new Date(date).toLocaleDateString();

  const data = employees
    .sort((a, b) => {
      return getYear(b.startWorkDate) - getYear(a.startWorkDate);
    })
    .map((employee, index) => ({
      key: index,
      photo: employee.photo,
      name: employee.name,
      surname: employee.surname,
      startWorkDate: getYear(employee.startWorkDate),
      evaluationDate: getFullDate(employee.evaluationDate),
      tags: employee.tags,
      level: employee.level,
      position: employee.position,
      project: employee.project,
    }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      // onChange={onChange}
      // scroll={{ y: 240 }}
    />
  );
};

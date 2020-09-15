import React, { FC } from "react";
import { ISkills } from "../../models/ISkills";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const CSkillList: FC<{
  skills: ISkills[];
  deleteCallbackFunction: Function;
}> = ({ skills, deleteCallbackFunction = () => {} }) => {
  const history = useHistory();
  const columns = [
    {
      title: "Skill",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Actions",
      key: "action",
      render: (date: string, record: ISkills) => (
        <>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            onClick={() => {
              history.push(`/skills/${record._id}`);
            }}
          />
          <Button
            style={{ marginLeft: 5 }}
            type="ghost"
            danger
            onClick={() => {
              deleteCallbackFunction(record);
            }}
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={skills} />
    </>
  );
};

export default CSkillList;

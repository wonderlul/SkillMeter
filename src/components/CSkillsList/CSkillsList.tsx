import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import { ISkills, ISkillsDTO } from "../../models/ISkills";

import { Table, Button, notification, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteSkill } from "../../services/skillsSvc";

export interface ISkillsList {
  getSkillsData: Function;
  skills: ISkills[];
  skillsAmount: number;
}

const CSkillList: FC<ISkillsList> = ({
  getSkillsData,
  skills,
  skillsAmount,
}) => {
  const history = useHistory();

  const [skillToDelete, setSkillToDelete] = useState<ISkills>();

  const columns = [
    {
      title: "Name",
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
            onClick={() => history.push(`/skills/${record._id}`)}
          />

          <Button
            style={{ marginLeft: 5 }}
            type="ghost"
            danger
            onClick={() => {
              setSkillToDelete(record);
            }}
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];

  const openNotificationFailed = (): void =>
    notification.error({
      message: "Error!",
      description: "Something went wrong. Please try again. ",
    });

  const openNotificationSuccess = (skill: ISkillsDTO): void => {
    notification.success({
      message: "Success!",
      description: `You have successfully deleted skill ${skill.name}`,
    });
  };
  return (
    <>
      <Modal
        title="Delete skill"
        visible={!!skillToDelete}
        onOk={async () => {
          const deletedSkill = await deleteSkill(skillToDelete?._id!);

          if (deletedSkill) {
            openNotificationSuccess(deletedSkill!);
          } else {
            openNotificationFailed();
          }
          setSkillToDelete(undefined);
          getSkillsData();
        }}
        onCancel={() => {
          setSkillToDelete(undefined);
        }}
      >
        <p>Are you sure you want to delete skill {skillToDelete?.name}?</p>
      </Modal>
      <Table
        columns={columns}
        dataSource={skills}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 5,
          total: skillsAmount,
          onChange: (page) => {
            getSkillsData(page);
          },
        }}
      />
    </>
  );
};

export default CSkillList;

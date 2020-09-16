import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ISkills } from '../../models/ISkills';

import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export interface ISkillsList {
  skills: ISkills[];
  skillsAmount: number;
  deleteCallbackFunction: Function;
  pageHandler: Function;
}

const CSkillList: FC<ISkillsList> = ({
  skills,
  skillsAmount,
  pageHandler,
  deleteCallbackFunction = () => {},
}) => {
  const history = useHistory();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Actions',
      key: 'action',
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
              console.log(record);
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
      <Table
        columns={columns}
        dataSource={skills}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 5,
          total: skillsAmount,
          onChange: (page) => {
            pageHandler(page);
          },
        }}
      />
    </>
  );
};

export default CSkillList;

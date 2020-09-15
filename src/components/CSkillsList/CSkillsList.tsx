import React, { FC } from 'react';
import { ISkill } from '../../services/skillsSvc';
import { Table, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CSkillList: FC<{
  skills: ISkill[];
  deleteCallbackFunction: Function;
}> = ({ skills, deleteCallbackFunction = () => {} }) => {
  const columns = [
    {
      title: 'Skill',
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
      render: (date: string, record: ISkill) => (
        <>
          <NavLink to={`/skills/${record.id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </NavLink>
          <Button
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

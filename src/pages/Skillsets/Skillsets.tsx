import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import CSkillsList from '../../components/CSkillsList/CSkillsList';

import {
  getAllSkills,
  deleteSkill as deleteSkillSvc,
} from '../../services/skillsSvc';
import { ISkills } from '../../models/ISkills';

import { PageHeader, Button, Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const Skillsets = () => {
  const history = useHistory();

  const [skills, setSkills] = useState<ISkills[]>([]);
  const [skillsAmount, setSkillsAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [skillToDeleted, setSkillToDeleted] = useState<ISkills>();

  const config = async () => {
    const skillsData = await getAllSkills(page);
    setSkills(skillsData.skills);
    setSkillsAmount(skillsData.count);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      await config();
    })();
  }, [page]);

  const pageHandler = (page: number) => {
    setPage(page);
  };

  const deleteSkill = async (skill: string) => {
    const response = await deleteSkillSvc(skill);
    if (response) {
      message.success(`Deleted "${skillToDeleted?.name}" skill.`);
      await config();
    } else {
      message.error('Something goes wrong. Please try again.');
    }
    setSkillToDeleted(undefined);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Skills"
        extra={
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              history.push('skills/add');
            }}
          >
            Add skill
          </Button>
        }
      />
      <Popconfirm
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        style={{ position: 'absolute' }}
        visible={!!skillToDeleted}
        title={`Are you sure delete ${skillToDeleted?.name}?`}
        onConfirm={() => {
          deleteSkill(skillToDeleted?._id!);
        }}
        onCancel={() => {
          setSkillToDeleted(undefined);
        }}
        okText="Yes"
        cancelText="No"
      />
      <CSkillsList
        skills={skills}
        skillsAmount={skillsAmount}
        pageHandler={pageHandler}
        deleteCallbackFunction={setSkillToDeleted}
      />
    </>
  );
};

export default Skillsets;

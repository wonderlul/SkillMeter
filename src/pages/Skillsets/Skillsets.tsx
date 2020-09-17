import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import CSkillsList from '../../components/CSkillsList/CSkillsList';

import { getAllSkills, deleteSkill } from '../../services/skillsSvc';
import { IGetSkills, ISkills, ISkillsDTO, ISort } from '../../models/ISkills';

import { PageHeader, Button } from 'antd';

export const Skillsets = () => {
  const history = useHistory();

  const [skills, setSkills] = useState<ISkills[]>([]);
  const [skillsAmount, setSkillsAmount] = useState(0);
  const [page, setPage] = useState(1);

  const getSkillsData = async (data: {
    current?: number;
    order?: string;
    columnKey?: string;
  }) => {
    console.log(data);
    const { current, order, columnKey } = data;
    try {
      if (order && columnKey) {
        const skillsData: IGetSkills = await getAllSkills(page, {
          order,
          columnKey,
        });
        setSkills(skillsData.skills);
        setSkillsAmount(skillsData.count);
      } else if (current) {
        setPage(current);
      } else {
        const skillsData: IGetSkills = await getAllSkills(page);
        setSkills(skillsData.skills);
        setSkillsAmount(skillsData.count);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      try {
        await getSkillsData({});
      } catch (e) {
        console.log(e);
      }
    })();
  }, [page]);

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

      <CSkillsList
        getSkillsData={getSkillsData}
        skills={skills}
        skillsAmount={skillsAmount}
      />
    </>
  );
};

export default Skillsets;

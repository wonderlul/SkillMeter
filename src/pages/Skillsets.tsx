import React, { useEffect, useState } from 'react';
import CSkillsList from '../components/CSkillsList/CSkillsList';
import { getAllSkills, ISkill } from '../services/skillsSvc';
import { PageHeader, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const App = () => {
  let history = useHistory();
  const [skills, setSkills] = useState<ISkill[]>([]);
  useEffect(() => {
    (async () => {
      const skills = await getAllSkills();
      setSkills(skills);
    })();
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Skills"
        extra={
          <Button
            type="primary"
            key="1"
            onClick={() => {
              history.push('skills/add');
            }}
          >
            <PlusOutlined />
          </Button>
        }
      />
      <CSkillsList
        skills={skills}
        deleteCallbackFunction={(data: ISkill) => {
          console.log(data);
        }}
      />
    </>
  );
};

export default App;

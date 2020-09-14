import React, { useEffect, useState } from 'react';
import CSkillsList from '../components/CSkillsList/CSkillsList';
import { getAllSkills, ISkills } from '../services/skillsSvc';

export const App = () => {
  const [skills, setSkills] = useState<ISkills[]>([]);
  useEffect(() => {
    (async () => {
      const skills = await getAllSkills();
      setSkills(skills);
    })();
  }, []);
  return (
    <>
      <CSkillsList
        skills={skills}
        deleteCallbackFunction={(data: ISkills) => {
          console.log(data);
        }}
      />
    </>
  );
};

export default App;

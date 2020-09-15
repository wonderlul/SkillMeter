import React, { useEffect, useState } from "react";
import CSkillsList from "../../components/CSkillsList/CSkillsList";
import { getAllSkills } from "../../services/skillsSvc";
import { ISkills } from "../../models/ISkills";
import { PageHeader, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const Skillsets = () => {
  const history = useHistory();

  const [skills, setSkills] = useState<ISkills[]>([]);

  const [skillsAmount, setSkillsAmount] = useState(0);

  const [page, setPage] = useState(1);
  const pageHandler = (page: number) => {
    setPage(page);
  };

  const [flag, setFlag] = useState(false);
  const flagHandler = () => {
    setFlag(!flag);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      const skillsData = await getAllSkills(page);
      setSkills(skillsData.skills);
      setSkillsAmount(skillsData.count);
    })();
  }, [flag]);

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
              history.push("skills/add");
            }}
          >
            Add skill
          </Button>
        }
      />
      <CSkillsList
        skills={skills}
        skillsAmount={skillsAmount}
        pageHandler={pageHandler}
        flagHandler={flagHandler}
        deleteCallbackFunction={(data: ISkills) => {
          console.log(data);
        }}
      />
    </>
  );
};

export default Skillsets;

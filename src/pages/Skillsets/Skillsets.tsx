import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CSkillsList from "../../components/CSkillsList/CSkillsList";

import { getAllSkills, deleteSkill } from "../../services/skillsSvc";
import { IGetSkills, ISkills, ISkillsDTO, ISort } from "../../models/ISkills";

import { PageHeader, Button } from "antd";

export const Skillsets = () => {
  const history = useHistory();

  const [skills, setSkills] = useState<ISkills[]>([]);
  const [skillsAmount, setSkillsAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [currentOrder, setCurrentOrder] = useState<string | undefined>();
  const [currentColumnKey, setCurrentColumnKey] = useState<
    string | undefined
  >();

  const getSkillsData = async (data: {
    current?: number;
    order?: string;
    columnKey?: string;
  }) => {
    const { current, order, columnKey } = data;

    try {
      if (order !== currentOrder || columnKey !== currentColumnKey) {
        setCurrentOrder(order);
        setCurrentColumnKey(columnKey);
        setPage(1);
        const skillsData: IGetSkills = await getAllSkills(1, {
          order,
          columnKey,
        });
        setSkills(skillsData.skills);
        setSkillsAmount(skillsData.count);
      } else if (current) {
        setPage(current);
        const skillsData: IGetSkills = await getAllSkills(current, {
          order,
          columnKey,
        });
        setSkills(skillsData.skills);
        setSkillsAmount(skillsData.count);
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
        if (skills.length === 0) await getSkillsData({});
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

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
        getSkillsData={getSkillsData}
        skills={skills}
        skillsAmount={skillsAmount}
        page={page}
      />
    </>
  );
};

export default Skillsets;

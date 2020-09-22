import React, { useEffect, useState, FC } from "react";
import { getAllSkills } from "../../services/skillsSvc";
import { ISkills } from "../../models/ISkills";
import { IEmployee } from "../../models/IEmployee";
import { getAllEmployees } from "../../services/employeesSvc";
import style from "./CMatrix.module.scss";

import CMatrixHeader from "../CMatrixHeader/CMatrixHeader";

import CMatrixRow from "../CMatrixRow/CMatrixRow";
import CMatrixRequires from "../CMatrixRequires/CMatrixRequires";

export interface IHeader {
  [key: string]: string[];
}

export interface IMatrixData {
  skills?: ISkills[];
  employees?: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
}

const CMatrixRowList: FC<{
  employees: IEmployee[];
  skills: ISkills[];
  skillsSorted: string[];
  getMatrixData: Function;
}> = ({ employees, skills, skillsSorted, getMatrixData }) => {
  const rowList = employees.map((employee) => {
    return (
      <CMatrixRow
        employee={employee}
        skills={skills}
        skillsSorted={skillsSorted}
        getMatrixData={getMatrixData}
      />
    );
  });
  return <>{rowList}</>;
};

const CMatrix = () => {
  interface IMatrixConfig {
    skills?: ISkills[];
    employees?: IEmployee[];
    header?: IHeader;
    skillsNumber?: number;
    categories?: string[];
    skillsSorted?: string[];
  }

  const [matrixData, setMatrixData] = useState<IMatrixConfig>({});

  const getMatrixData = async () => {
    try {
      const {
        skills,
        count,
      }: { skills: ISkills[]; count: number } = await getAllSkills();
      const { employees }: { employees: IEmployee[] } = await getAllEmployees(
        1
      ); // Remember this get only first page of employees!!!!
      const header = skills.reduce<IHeader>((previous, current) => {
        !!previous[current.category]
          ? previous[current.category].push(current.name)
          : (previous[current.category] = [current.name]);
        return previous;
      }, {});

      const categories: string[] = [];
      for (const category in header) {
        if (categories.indexOf(category) === -1) {
          categories.push(category);
        }
      }
      let skillsSorted: string[] = [];
      categories.forEach((category) => {
        skillsSorted = skillsSorted.concat(header[category]);
      });

      setMatrixData({
        skills,
        employees,
        header,
        skillsNumber: count,
        categories,
        skillsSorted,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        getMatrixData();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className={style.Table}>
      <div className={style.Header}>
        <div className={style.Piechart}></div>
        {!!matrixData.categories && (
          <CMatrixHeader
            categories={matrixData.categories!}
            header={matrixData.header!}
          />
        )}
      </div>

      <CMatrixRequires />
      {!!matrixData.employees && (
        <CMatrixRowList
          employees={matrixData.employees!}
          skills={matrixData.skills!}
          skillsSorted={matrixData.skillsSorted!}
          getMatrixData={getMatrixData}
        />
      )}
    </div>
  );
};

export default CMatrix;

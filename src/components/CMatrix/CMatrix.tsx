import React, { useEffect, useState, FC } from 'react';
import { getAllSkills } from '../../services/skillsSvc';
import { ISkills } from '../../models/ISkills';
import { IEmployee } from '../../models/IEmployee';
import { getAllEmployees } from '../../services/employeesSvc';
import style from './CMatrix.module.scss';

import CMatrixHeader from '../CMatrixHeader/CMatrixHeader';

import CMatrixRow from '../CMatrixRow/CMatrixRow';
import CMatrixRequires from '../CMatrixRequires/CMatrixRequires';

export interface IHeader {
  [key: string]: string[];
}

interface IMatrixData {
  skills?: ISkills[];
  employees?: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
}

const CMatrixRowList: FC<{ employees: IEmployee[]; skills: ISkills[] }> = ({
  employees,
  skills,
}) => {
  const rowList = employees.map((employee) => {
    return <CMatrixRow employee={employee} skills={skills} />;
  });
  return <>{rowList}</>;
};

const CMatrix = () => {
  const [matrixData, setMatrixData] = useState<{
    skills?: ISkills[];
    employees?: IEmployee[];
    header?: IHeader;
    skillsNumber?: number;
  }>({});

  useEffect(() => {
    (async () => {
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

      setMatrixData({ skills, employees, header, skillsNumber: count });
      console.log(header);
      // console.log(employees);
      // console.log(skills);
    })();
  }, []);

  return (
    <div className={style.Table}>
      <div className={style.Header}>
        <div className={style.Piechart}></div>
        <CMatrixHeader
          skills={matrixData.skills!}
          skillsNumber={matrixData.skillsNumber!}
          header={matrixData.header!}
        />
      </div>

      <CMatrixRequires />
      {!!matrixData.employees && (
        <CMatrixRowList
          employees={matrixData.employees}
          skills={matrixData.skills!}
        />
      )}
    </div>
  );
};

export default CMatrix;

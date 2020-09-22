import React, { useEffect, useState } from 'react';
import style from './CMatrix.module.scss';
import { getAllSkills } from '../../services/skillsSvc';
import { ISkills } from '../../models/ISkills';
import { IEmployee } from '../../models/IEmployee';
import { getAllEmployees } from '../../services/employeesSvc';

import CMatrixRow from '../CMatrixRow/CMatrixRow';
import CMatrixRequires from '../CMatrixRequires/CMatrixRequires';

interface IHeader {
  [key: string]: string[];
}

interface IMatrixData {
  skills?: ISkills[];
  employees?: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
}

const CMatrix = () => {
  const [matrixData, setMatrixData] = useState<IMatrixData>({});

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
    })();
  }, []);

  return (
    <div className={style.Table}>
      <div className="">
        <CMatrixRequires />
      </div>
      <div className="">
        <CMatrixRow />
      </div>
    </div>
  );
};

export default CMatrix;

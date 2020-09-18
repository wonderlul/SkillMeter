import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
import { getAllSkills } from '../../services/skillsSvc';
import { ISkills } from '../../models/ISkills';
import { IEmployee } from '../../models/IEmployee';
import { getAllEmployees } from '../../services/employeesSvc';

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
          : (previous[current.category] = []);

        return previous;
      }, {});
      console.log(header);
      setMatrixData({ skills, employees, header, skillsNumber: count });
    })();
  }, []);
  return <Space>MAtrix</Space>;
};

export default CMatrix;

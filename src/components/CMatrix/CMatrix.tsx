import React, { useEffect, useState, FC, useMemo } from 'react';
import { getAllSkills } from '../../services/skillsSvc';
import { ISkills } from '../../models/ISkills';
import { IEmployee } from '../../models/IEmployee';
import {
  getAllEmployees,
  getPaginatedEmployees,
} from '../../services/employeesSvc';
import style from './CMatrix.module.scss';

import CMatrixHeader from '../CMatrixHeader/CMatrixHeader';
import CMatrixRow from '../CMatrixRow/CMatrixRow';
import CMatrixRequires from '../CMatrixRequires/CMatrixRequires';
import CMatrixPieChart from '../CMatrixPieChart/CMatrixPieChart';
import CDrawer, { IFilterConfigData } from '../CDrawer/CDrawer';
import Employees from '../../pages/Employees/Employees';

export interface IHeader {
  [key: string]: string[];
}

export interface IMatrixData {
  skills?: ISkills[];
  employees?: IEmployee[];
  disabledEmployees?: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
}

const CMatrix = () => {
  interface IMatrixConfig {
    skills?: ISkills[];
    employees?: IEmployee[];
    header?: IHeader;
    skillsNumber?: number;
    categories?: string[];
    skillsSorted?: string[];
    filterConfigData?: IFilterConfigData;
  }

  const [matrixData, setMatrixData] = useState<IMatrixConfig>({});
  const [filterData, setFilterData] = useState<any>();

  const getMatrixData = async () => {
    try {
      const {
        skills,
        count,
      }: { skills: ISkills[]; count: number } = await getAllSkills();
      const employees: IEmployee[] = await getAllEmployees();
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
      let tags = Array.from(
        new Set(
          employees.reduce<string[]>((previous, current) => {
            previous = previous.concat(current?.tags || []);
            return previous;
          }, [])
        )
      );
      categories.forEach((category) => {
        skillsSorted = skillsSorted.concat(header[category]);
      });

      const filterConfigData: IFilterConfigData = {
        skills: skillsSorted,
        tags,
        filterCallback: setFilterData,
      };
      setMatrixData({
        skills,
        employees,
        header,
        skillsNumber: count,
        categories,
        skillsSorted,
        filterConfigData,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useMemo(async () => filter(filterData), [filterData]);
  async function filter(
    data: { [key: string]: (string | number)[] }[] | undefined
  ) {
    if (!data || data.length === 0) {
      await getMatrixData();
      return;
    }
    let employees: IEmployee[] = await getAllEmployees();
    if (!employees) {
      return;
    }

    employees = employees!.filter((employee) => {
      return data.every((filterRecord) => {
        const [fieldName, filterArray] = Object.entries(filterRecord)[0];
        return filterArray.every((filterProp: string | number) => {
          if (fieldName === 'skills') {
            return employee.skills?.some((skill) => {
              return skill.skill?.name === String(filterProp);
            });
          }
          if (fieldName === 'startWorkDate') {
            const givenLevel = filterProp;

            const experience =
              new Date().getFullYear() -
              new Date(employee.startWorkDate).getFullYear();

            return (
              givenLevel === experience ||
              (givenLevel === 10 && experience > givenLevel)
            );
          }
          if (fieldName === 'level') {
            return String(employee[fieldName]) === String(filterProp);
          }
          if (fieldName === 'tags') {
            return employee[fieldName]?.includes(String(filterProp));
          }
        });
      });
    });
    setMatrixData({ ...matrixData, employees });
  }

  useEffect(() => {
    (async () => {
      try {
        getMatrixData();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  let rowList: JSX.Element[] = [];
  if (
    !!matrixData.employees &&
    !!matrixData.skills &&
    !!matrixData.skillsSorted
  ) {
    rowList = matrixData.employees.map<JSX.Element>((employee) => {
      return (
        <CMatrixRow
          employee={employee}
          skills={matrixData.skills!}
          skillsSorted={matrixData.skillsSorted!}
          getMatrixData={getMatrixData}
        />
      );
    });
  }

  return (
    <div className={style.TableScroll}>
      <div className={style.Table}>
        <div className={style.Drawer}>
          {!!matrixData.employees && (
            <CDrawer {...matrixData.filterConfigData!} />
          )}
        </div>
        <div className={style.Header}>
          <div className={style.HeadersContainer}>
            <div className={style.HeaderOne}>
              <CMatrixPieChart
                skills={matrixData.skills!}
                skillsSorted={matrixData.skillsSorted!}
                employees={matrixData.employees!}
              />
            </div>
            <div className={style.HeaderTwo}>
              {!!matrixData.categories && (
                <CMatrixHeader
                  categories={matrixData.categories!}
                  header={matrixData.header!}
                />
              )}
            </div>
          </div>
        </div>
        <div className={style.Body}>
          <div className={style.RowsContainer}>
            <CMatrixRequires
              skills={matrixData.skills!}
              skillsSorted={matrixData.skillsSorted!}
              employees={matrixData.employees!}
            />
            {!!matrixData.employees && rowList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMatrix;

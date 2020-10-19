import { IFilterConfigData } from "../components/CDrawer/CDrawer";
import { IEmployee } from "./IEmployee";
import { ISkills } from "./ISkills";

export interface IHeader {
  [key: string]: string[];
}

export interface IMatrixConfig {
  skills?: ISkills[];
  employees?: IEmployee[];
  disabledEmployees: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
  categories?: string[];
  skillsSorted?: string[];
  filterConfigData?: IFilterConfigData;
}

export interface IMakeEmployeesRows {
  (employees?: IEmployee[], disabled?: boolean): JSX.Element[] | undefined;
}

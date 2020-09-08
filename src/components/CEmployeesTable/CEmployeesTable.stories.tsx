import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { CEmployeesTable } from "./CEmployeesTable";
import { ELevels, IEmployee } from "../../models/IEmployee";

export default {
  title: "Storybook/CEmployeesTable",
  component: CEmployeesTable,
} as Meta;

const Template: Story<{ employees: IEmployee[] }> = (args) => (
  <CEmployeesTable {...args} />
);

export const EmployeesTable = Template.bind({});
EmployeesTable.args = {
  employees: [
    {
      name: "Stefan",
      surname: "Kolorowy",
      startWorkDate: new Date(1967, 11, 12),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "string",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/176px-Chuck_Norris_May_2015.jpg",
    },
    {
      name: "Roman",
      surname: "Kresowy",
      startWorkDate: new Date(2019, 0, 27),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "QA. project manage",
      photo:
        "https://vignette.wikia.nocookie.net/banialukipl/images/d/dd/C74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg/revision/latest/scale-to-width-down/310?cb=20180122200051&path-prefix=pl",
    },
    {
      name: "Tomek",
      surname: "Bawełniany",
      startWorkDate: new Date(2000, 5, 13),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "software developer",
      photo:
        "https://ocdn.eu/pulscms-transforms/1/oO6k9kpTURBXy8zMDg5N2Q0NDUzZjgzMmI2ZWYyMjQxNjM3Njk3YTFhOC5qcGeTlQMAzQEEzQfQzQRlkwXNAxTNAbyTCaZjMWM1MWEGgaEwBQ/chuck-norris.webp",
    },
    {
      name: "Stefan",
      surname: "Kolorowy",
      startWorkDate: new Date(1999, 3, 20),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "string",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/176px-Chuck_Norris_May_2015.jpg",
    },
    {
      name: "Roman",
      surname: "Kresowy",
      startWorkDate: new Date(2007, 2, 17),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "QA. project manage",
      photo:
        "https://vignette.wikia.nocookie.net/banialukipl/images/d/dd/C74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg/revision/latest/scale-to-width-down/310?cb=20180122200051&path-prefix=pl",
    },
    {
      name: "Tomek",
      surname: "Bawełniany",
      startWorkDate: new Date(2008, 8, 12),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "software developer",
      photo:
        "https://ocdn.eu/pulscms-transforms/1/oO6k9kpTURBXy8zMDg5N2Q0NDUzZjgzMmI2ZWYyMjQxNjM3Njk3YTFhOC5qcGeTlQMAzQEEzQfQzQRlkwXNAxTNAbyTCaZjMWM1MWEGgaEwBQ/chuck-norris.webp",
    },
    {
      name: "Stefan",
      surname: "Kolorowy",
      startWorkDate: new Date(2013, 11, 13),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "string",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/176px-Chuck_Norris_May_2015.jpg",
    },
    {
      name: "Roman",
      surname: "Kresowy",
      startWorkDate: new Date(2000, 4, 27),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "QA. project manage",
      photo:
        "https://vignette.wikia.nocookie.net/banialukipl/images/d/dd/C74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg/revision/latest/scale-to-width-down/310?cb=20180122200051&path-prefix=pl",
    },
    {
      name: "Tomek",
      surname: "Bawełniany",
      startWorkDate: new Date(2010, 10, 10),
      evaluationDate: new Date(),
      tags: ["jsGuru", "microsoftMvp"],
      level: ELevels.Junior,
      position: "software developer",
      photo:
        "https://ocdn.eu/pulscms-transforms/1/oO6k9kpTURBXy8zMDg5N2Q0NDUzZjgzMmI2ZWYyMjQxNjM3Njk3YTFhOC5qcGeTlQMAzQEEzQfQzQRlkwXNAxTNAbyTCaZjMWM1MWEGgaEwBQ/chuck-norris.webp",
    },
  ],
};

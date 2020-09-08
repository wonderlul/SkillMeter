import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from "@storybook/react/types-6-0";

import CForm from "./CForm";

export default {
  title: "Storybook/Employees/Form",
  component: CForm,
} as Meta;

const Template = () => <CForm />;

export const Form = Template.bind({});

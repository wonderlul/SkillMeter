import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from "@storybook/react/types-6-0";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import CLayout from "./CLayout";

export default {
  title: "Storybook/Layout/Layout",
  component: CLayout,
} as Meta;

const Template = () => (
  <Router>
    <Switch>
      <CLayout />;
    </Switch>
  </Router>
);

export const Layout = Template.bind({});

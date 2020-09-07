import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { IUserProps, CUser } from "./CUser";

export default {
  title: "Storybook/CUser",
  component: CUser,
} as Meta;

const Template: Story<IUserProps> = (args) => (
  <CUser {...args}>Test content</CUser>
);

export const UserWithoutAvatar = Template.bind({});
UserWithoutAvatar.args = {
  name: "John",
  lastName: "Doe",
};

export const CUserWithAvatar = Template.bind({});
CUserWithAvatar.args = {
  name: "John",
  lastName: "Doe",
  urlAvatar:
    "https://pbs.twimg.com/profile_images/762226166736547840/hQXGSqX6_bigger.jpg",
};

import React, { PropsWithChildren } from "react";
import styles from "./CUser.module.scss";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export interface IUserProps {
  name: string;
  lastName: string;
  urlAvatar?: string;
}

export const CUser = ({ name, lastName, urlAvatar }: IUserProps) => {
  const avatar = urlAvatar ? (
    <Avatar size="large" src={urlAvatar} />
  ) : (
    <Avatar size="large" icon={<UserOutlined />} />
  );

  return (
    <Row gutter={12} align="middle">
      <Col span={2}>{avatar}</Col>
      <Col span={10}>{`${name} ${lastName}`}</Col>
    </Row>
  );
};

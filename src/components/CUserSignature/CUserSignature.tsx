import React, { PropsWithChildren } from "react";
import styles from "./CUser.module.scss";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export interface IUserSignature {
  name: string;
  lastName: string;
  urlAvatar?: string;
}

export const CUserSignature = ({
  name,
  lastName,
  urlAvatar,
}: IUserSignature) => {
  const avatar = urlAvatar ? (
    <Avatar size="large" src={urlAvatar} />
  ) : (
    <Avatar size="large" icon={<UserOutlined />} />
  );

  return (
    <Row gutter={12} align="middle">
      <Col span={4}>{avatar}</Col>
      <Col span={8}>{`${name} ${lastName}`}</Col>
    </Row>
  );
};

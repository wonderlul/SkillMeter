import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { FC } from "react";

import { useHistory } from "react-router-dom";

import styles from "./Login.module.scss";

import { login, setToken } from "../../services/authSvc";

export interface ILogin {
  setIsToken: Function;
}

export const LoginPage: FC<ILogin> = ({ setIsToken }) => {
  const history = useHistory();

  const onFinish = async (values: any) => {
    const token = await login();
    if (token) {
      setToken(token?.data);
      history.push("/");
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

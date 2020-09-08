import React, { useState, useRef } from "react";

import styles from "./CForm.module.scss";

import { Form, Input, Button, Select, DatePicker, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CForm = () => {
  const [form] = Form.useForm();

  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const inputRef = useRef(null);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
    setInputValue("");
    setTags([]);
  };

  return (
    <div className={styles.formWrapper}>
      <Form form={form} name="employeeForm" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Surname"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Year of starting work in industry"
          rules={[{ required: true }]}
        >
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item
          name="evaluationDate"
          label="Date of last evaluation talk"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="project"
          label="Name of current project"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="seniority"
          label="Seniority level"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select the seniority level"
            onChange={(value) => {
              switch (value) {
                case "male":
                  form.setFieldsValue({ note: "Hi, man!" });
                  return;
                case "female":
                  form.setFieldsValue({ note: "Hi, lady!" });
                  return;
              }
            }}
            allowClear
          >
            <Option value="junior">Junior</Option>
            <Option value="mid">Mid</Option>
            <Option value="senior">Senior</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.List name="tags">
          {(fields, { add, remove }) => {
            return (
              <div className={styles.tagWrapper}>
                {fields.map((field, index) => (
                  <Form.Item
                    {...field}
                    label={index === 0 ? "Tags" : ""}
                    key={field.key}
                  >
                    <Tag
                      closable
                      onClose={() => {
                        remove(field.name);
                        const currentTags = [...tags];
                        currentTags.splice(field.name, 1);
                        setTags([...currentTags]);
                      }}
                    >
                      {tags[field.name]}
                    </Tag>
                  </Form.Item>
                ))}

                {inputVisible && (
                  <Form.Item
                    rules={[{ required: true, whitespace: true }]}
                    name="tag"
                    validateTrigger={["onBlur", "onChange", "onFinish"]}
                  >
                    {console.log(tags)}
                    <Input
                      ref={inputRef}
                      type="text"
                      size="small"
                      className={styles.tagInput}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={() => {
                        if (inputValue && tags.indexOf(inputValue) === -1) {
                          setTags([...tags, inputValue]);
                          add(inputValue, 0);
                        }
                        setInputVisible(false);
                        setInputValue("");
                      }}
                      onPressEnter={() => {
                        if (inputValue && tags.indexOf(inputValue) === -1) {
                          setTags([...tags, inputValue]);
                          add(inputValue, 0);
                        }
                        setInputVisible(false);
                        setInputValue("");
                      }}
                    />
                  </Form.Item>
                )}
                {!inputVisible && (
                  <Tag
                    className={styles.siteTag}
                    onClick={() => {
                      setInputVisible(true);
                    }}
                  >
                    <PlusOutlined /> New Tag
                  </Tag>
                )}
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <div className={styles.buttonWrapper}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CForm;

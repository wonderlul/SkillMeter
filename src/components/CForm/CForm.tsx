import React, { useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions";

import styles from "./CForm.module.scss";

import { IEmployee, EPositions, ELevels } from "../../models/IEmployee";

import { Form, Input, Button, Select, DatePicker, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const CForm = () => {
  //Variables

  let employeeData: IEmployee;

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  //State
  const dispatch = useDispatch();
  const initialForm = useSelector((state) => state);
  console.log(initialForm);

  //Hooks
  const [form] = Form.useForm();

  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [submitsAmount, setSubmitsAmount] = useState<number>(0);

  const inputRef = useRef(null);

  //Services
  const disabledStartDate = (current: any) => {
    return current && current > moment().endOf("day");
  };

  const disabledEvaluationDate = (current: any) => {
    return current && current > moment().startOf("day");
  };

  const onFinish = (values: any) => {
    employeeData = {
      ...values,
      startWorkDate: values.startWorkDate._d.toISOString(),
      evaluationDate: values.evaluationDate._d.toISOString(),
    };

    dispatch(actions.addEmployee(employeeData));
    onReset();
  };

  const onFinishFailed = () => {
    setSubmitsAmount(submitsAmount + 1);
  };

  const onReset = () => {
    form.resetFields();
    setInputValue("");
    setTags([]);
  };

  return (
    <div className={styles.formWrapper}>
      <Form
        form={form}
        name="employeeForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        validateTrigger={[submitsAmount > 0 ? "onChange" : "onSubmit"]}
      >
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
          name="startWorkDate"
          label="Year of starting work in industry"
          rules={[{ required: true }]}
        >
          <DatePicker picker="year" disabledDate={disabledStartDate} />
        </Form.Item>
        <Form.Item
          name="evaluationDate"
          label="Date of last evaluation talk"
          rules={[{ required: true }]}
        >
          <DatePicker disabledDate={disabledEvaluationDate} />
        </Form.Item>
        <Form.Item
          name="project"
          label="Name of current project"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="level"
          label="Seniority level"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select the seniority level" allowClear>
            <Option value={ELevels.JUNIOR}>Junior</Option>
            <Option value={ELevels.MID}>Mid</Option>
            <Option value={ELevels.SENIOR}>Senior</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select your position" allowClear>
            <Option value={EPositions.SOFTWARE_DEVELOPER}>
              Software Developer
            </Option>
            <Option value={EPositions.QA}>QA</Option>
            <Option value={EPositions.PROJECT_MANAGER}>Project Manager</Option>
          </Select>
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
                      #{tags[field.name]}
                    </Tag>
                  </Form.Item>
                ))}

                {inputVisible && (
                  <Form.Item
                    required
                    rules={[{ required: true, whitespace: true }]}
                    validateTrigger={["onBlur", "onChange", "onFinish"]}
                  >
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

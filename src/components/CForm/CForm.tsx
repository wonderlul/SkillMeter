import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import styles from "./CForm.module.scss";

import { IEmployeeDTO, IEmployeeForm } from "../../models/IEmployee";

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Tag,
  notification,
} from "antd";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import moment from "moment";

import { CAvatarUpload, uploadImage } from "../CAvatarUpload/CAvatarUpload";

import {
  getEmployee,
  addEmployee,
  updateEmployee,
  levelsValues,
  levelsMap,
  positionsMap,
  positionsValues,
} from "../../services/employeesSvc";

const { Option } = Select;

const CForm = () => {
  //Route

  let { id } = useParams();
  const history = useHistory();

  //Variables

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

  //Hooks
  const [form] = Form.useForm();

  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [submitsAmount, setSubmitsAmount] = useState<number>(0);
  const [successfulSubmitsAmount, setSuccessfulSubmitsAmount] = useState<
    number
  >(0);
  const [tags, setTags] = useState<string[]>([]);
  const [employeePhoto, setEmployeePhoto] = useState("");

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (id) {
      (async () => {
        const employee: IEmployeeForm = await getEmployee(id);
        employee.startWorkDate = moment(employee.startWorkDate);
        employee.evaluationDate = moment(employee.evaluationDate);
        employee.level = levelsMap(employee.level);
        employee.position = positionsMap(employee.position);
        setEmployeePhoto(employee.photo);
        employee.tags ? setTags(employee.tags) : setTags([]);
        form.setFieldsValue(employee);
      })();
    }
  }, []);

  //Services

  const openNotificationFailed = () =>
    notification.error({
      message: "Error!",
      description: "Something went wrong. Please try again. ",
    });

  const openNotificationSuccess = (formData: IEmployeeDTO): void => {
    if (id) {
      notification.success({
        message: "Success!",
        description: `You have successfully edit employee ${formData.name} ${formData.surname}! `,
      });
    } else {
      notification.success({
        message: "Success!",
        description: `You have successfully added employee ${formData.name} ${formData.surname}! `,
      });
    }
  };
  const disabledStartDate = (current: any) => {
    return current && current > moment().endOf("day");
  };

  const disabledEvaluationDate = (current: any) => {
    return current && current > moment().startOf("day");
  };

  const onFinish = async (values: any) => {
    const photo =
      typeof values.photo[0] !== "string"
        ? await uploadImage(values.photo[0].originFileObj)
        : values.photo;

    const formData: IEmployeeDTO = {
      ...values,
      photo,
      startWorkDate: values.startWorkDate._d.toISOString(),
      evaluationDate: values.evaluationDate._d.toISOString(),
    };

    if (id) {
      updateEmployee(id, formData);
    } else {
      addEmployee(formData);
    }
    openNotificationSuccess(formData);
    setSuccessfulSubmitsAmount(1);
  };

  const onFinishFailed = () => {
    openNotificationFailed();
    setSubmitsAmount(submitsAmount + 1);
  };

  const onReset = () => {
    setInputValue("");
    setTags([]);
    setEmployeePhoto("");

    form.resetFields();
  };

  if (successfulSubmitsAmount > 0) return <Redirect to="/employees/" />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.goBack} onClick={history.goBack}>
        <LeftOutlined />
        <span>Back</span>
      </div>
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
            rules={[{ whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="level"
            label="Seniority level"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select the seniority level" allowClear>
              {Object.entries(levelsValues).map(([key, value]) => (
                <Option value={key} key={`${key}+${value}`}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select your position" allowClear>
              {Object.entries(positionsValues).map(([key, value]) => (
                <Option value={key} key={`${key}+${value}`}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <CAvatarUpload initialImage={employeePhoto} />

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
    </div>
  );
};

export default CForm;

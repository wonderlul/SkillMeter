import React, { FC } from 'react';
import { Form, Input, Button, Select } from 'antd';

const CSkillsForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const onCategoryChange = () => {};
  return (
    <>
      <Form
        validateTrigger={['onSubmit']}
        form={form}
        name="skillForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 5 }}
        layout="horizontal"
      >
        <Form.Item name="name" label="Skill name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={onCategoryChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onCategoryChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CSkillsForm;

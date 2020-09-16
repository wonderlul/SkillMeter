import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  addSkill,
  getSkill,
  getConfigFormData,
  IConfigFormDate,
  updateSkill,
} from '../../services/skillsSvc';

import { ISkillsDTO } from '../../models/ISkills';

import { useParams, useHistory } from 'react-router-dom';

const SkillsetsForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;

  const [newCategory, setNewCategory] = useState<string>('');
  const [configForm, setConfigForm] = useState<IConfigFormDate>({
    categories: [],
    weights: [],
  });

  const onWeightChange = () => {};
  const addItem = () => {
    const newCategories = Array.from(
      new Set([...configForm.categories, newCategory])
    );
    setConfigForm({ ...configForm, categories: newCategories });
  };

  interface ParamTypes {
    id: string;
  }
  let { id } = useParams<ParamTypes>();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      const config = await getConfigFormData();
      if (config) {
        setConfigForm(config);
      }
      if (id) {
        const skill = await getSkill(id);
        form.setFieldsValue(skill);
      }
    })();
  }, []);

  const onFinish = async (values: ISkillsDTO) => {
    let success = false;
    let response: any;
    if (id) {
      response = await updateSkill(id, values);
      if (response) {
        message.success(`Update "${values.name}" skill.`);
        success = true;
      } else {
        message.error('Something goes wrong. Please try again.');
      }
    } else {
      response = await addSkill(values);
      if (response) {
        message.success(`Created "${values.name}" skill.`);
        success = true;
      } else {
        message.error('Something goes wrong. Please try again.');
      }
    }
    if (success) {
      history.push('/skills');
    }
  };

  return (
    <>
      <Form
        onFinish={(values) => {
          onFinish(values);
        }}
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
            onChange={onWeightChange}
            allowClear
          >
            {configForm.weights.map((item, index) => (
              <Option value={item} key={`${item}${index}`}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: 240 }}
            placeholder="custom dropdown render"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div
                  style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}
                >
                  <Input
                    style={{ flex: 'auto' }}
                    value={newCategory}
                    onChange={(event) => {
                      setNewCategory(event.target.value);
                    }}
                  />
                  <Button
                    style={{ marginLeft: 5 }}
                    onClick={addItem}
                    icon={<PlusOutlined />}
                  />
                </div>
              </div>
            )}
          >
            {configForm.categories.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
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

export default SkillsetsForm;

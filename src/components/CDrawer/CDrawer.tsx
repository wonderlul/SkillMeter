import { Button, Checkbox, Col, Drawer, Form, Row, Select, Slider } from 'antd';
import React, { FC, useState } from 'react';
import { ESkillLevel } from '../../models/ISkills';
import style from './CDrawer.module.scss';
import {
  FieldData,
  InternalNamePath,
  NamePath,
} from '../../../node_modules/rc-field-form/lib/interface';

export interface IFilterConfigData {
  skills: string[];
  tags: string[];
  filterCallback: (value: any) => void;
}

const CDrawer: FC<IFilterConfigData> = ({ skills, tags, filterCallback }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onFieldsChange = (v: FieldData[], data: FieldData[]) => {
    let value = data.reduce(
      (previous: { [key: string]: string[] }[], current) => {
        if (current.value || current.value?.length > 0) {
          previous.push({
            [(current.name as InternalNamePath)[0]]: Array.isArray(
              current.value
            )
              ? current.value
              : [current.value],
          });
        }
        return previous;
      },
      []
    );
    value = value.filter((elem) => Object.values(elem)[0].length !== 0);

    filterCallback(value);
  };
  const onFinish = (value: any) => {
    console.log(value);
  };
  const { Option } = Select;
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <>
      <Button onClick={showDrawer}>{`\u2699`}</Button>
      <Drawer
        width={350}
        title="Filter"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Form
          {...formItemLayout}
          name="validate_other"
          onFinish={onFinish}
          onFieldsChange={onFieldsChange}
          initialValues={{
            ['input-number']: 3,
            ['checkbox-group']: ['A', 'B'],
            rate: 3.5,
          }}
        >
          <Form.Item name="skills" label="Skills:">
            <Checkbox.Group>
              {skills.map((skill) => (
                <Row>
                  <Col>
                    <Checkbox value={skill}>{skill}</Checkbox>
                  </Col>
                </Row>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="startWorkDate" label="Experience:">
            <Slider
              min={0}
              max={10}
              marks={{
                0: '0',
                2: '2',
                4: '4',
                6: '6',
                8: '8',
                10: 'Max',
              }}
            />
          </Form.Item>
          <Form.Item name="level" label="Level:">
            <Select placeholder="Select seniority level" allowClear>
              {Object.entries(ESkillLevel)
                .filter(([elem]) => !Number.isInteger(Number(elem)))
                .map(([key, value]) => (
                  <Option value={value}>{key}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags:">
            <Checkbox.Group>
              {tags.map((tag) => (
                <Row>
                  <Col>
                    <Checkbox value={tag}>{tag}</Checkbox>
                  </Col>
                </Row>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CDrawer;

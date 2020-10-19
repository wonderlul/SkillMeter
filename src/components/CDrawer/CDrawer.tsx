import React, { FC, useState } from "react";

import style from "./CDrawer.module.scss";

import { Button, Checkbox, Col, Drawer, Form, Row, Slider } from "antd";

import {
  FieldData,
  InternalNamePath,
} from "../../../node_modules/rc-field-form/lib/interface";

export interface IFilterConfigData {
  skills: string[];
  tags: string[];
  filterCallback: Function;
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
    let value = data.reduce((result: { [key: string]: string[] }[], field) => {
      if (field.value || field.value?.length > 0) {
        result.push({
          [(field.name as InternalNamePath)[0]]: Array.isArray(field.value)
            ? field.value
            : [field.value],
        });
      }
      return result;
    }, []);
    value = value.filter((elem) => Object.values(elem)[0].length !== 0);

    filterCallback(value);
  };

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <div className={style.Drawer}>
      <Button onClick={showDrawer} className={style.Button}>{`\u2699`}</Button>
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
          onFinish={() => {}}
          onFieldsChange={onFieldsChange}
          initialValues={{
            rate: 3.5,
          }}
        >
          <Form.Item name="skills" label="Skills:">
            <Checkbox.Group>
              {skills.map((skill, index) => (
                <Row key={`${skill}${index}`}>
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
                0: "0",
                2: "2",
                4: "4",
                6: "6",
                8: "8",
                10: "10",
              }}
            />
          </Form.Item>

          <Form.Item name="tags" label="Tags:">
            <Checkbox.Group>
              {tags.map((tag, index) => (
                <Row key={`${"" + tag + index}`}>
                  <Col>
                    <Checkbox value={tag}>#{tag}</Checkbox>
                  </Col>
                </Row>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default CDrawer;

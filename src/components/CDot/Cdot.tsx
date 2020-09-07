import React from "react";
import { Popover } from "antd";

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

export const CDot = () => {
  return (
    <div>
      <Popover
        placement="topLeft"
        title={text}
        content={content}
        trigger="click"
      >
        <div>TL</div>
      </Popover>
    </div>
  );
};

export default CDot;

import React, { FC } from "react";

import style from "./CCircle.module.scss";

const CCircle: FC<{ level: number }> = ({ level }) => {
  return <div className={style[`circle-${level}`]}></div>;
};

export default CCircle;

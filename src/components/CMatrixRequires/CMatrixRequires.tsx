import React from 'react';
import style from './CMatrixRequires.module.scss';
const requiredData = {
  skillsNumber: 4,
  required: [
    { skillname: 3 },
    { skillname2: 0 },
    { skillname3: 6 },
    { skillname4: 7 },
  ],
  trained: [
    { skillname: 3 },
    { skillname2: 1 },
    { skillname3: 4 },
    { skillname4: 7 },
  ],
  status: [
    { skillname: 0 },
    { skillname2: 1 },
    { skillname3: -2 },
    { skillname4: 0 },
  ],
};

const CMatrixRequires = () => {
  const required = requiredData.required.map((skill) => {
    const [key, value] = Object.entries(skill)[0];
    return <div className={style.Cell}>{value}</div>;
  });
  const trained = requiredData.trained.map((skill) => {
    const [key, value] = Object.entries(skill)[0];
    return <div className={style.Cell}>{value}</div>;
  });

  const status = requiredData.status.map((skill) => {
    let [key, value] = Object.entries(skill)[0];
    let content = '';

    let styleName = '';
    if (Number(value) > 0) {
      styleName = `${style.Over}`;

      content = `+${value}`;
    } else if (Number(value) < 0) {
      styleName = `${style.Under}`;
      content = `${value}`;
    } else {
      styleName = `${style.Ok}`;
      content = '\u2713';
    }
    return <div className={`${style.Cell} ${styleName}`}>{content}</div>;
  });

  return (
    <div className={style.Column}>
      <div className={style.Row}>
        <span className={style.Title}>Required</span>
        {required}
      </div>
      <div className={style.Row}>
        <span className={style.Title}>Trained</span>
        {trained}
      </div>
      <div className={style.Row}>
        <span className={style.Title}>Training Status</span>
        {status}
      </div>
    </div>
  );
};

export default CMatrixRequires;

import React from 'react';
import './WorkCard.scss';
const WorkCard = ({ workImg, workName, workDescription }) => {
  return (
    <div className="workCard">
      <img src={workImg} alt={workImg} />
      <p className="workName">{workName}</p>
      <p>{workDescription}</p>
    </div>
  );
};

export default WorkCard;

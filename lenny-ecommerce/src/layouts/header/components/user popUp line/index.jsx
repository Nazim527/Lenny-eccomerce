import React from "react";
import style from "./style.module.scss";

const UserLineSubContent = ({ rightShow,price,text,icon }) => {
  return (
    <div className={style.userSubContent}>
      <div className={style.left}>
        <div className={style.icon}>
          <img src={icon} />
        </div>
        <p>{text}</p>
      </div>

      {rightShow && (
        <div className={style.right}>
          <p>{price}</p>
        </div>
      )}
    </div>
  );
};

export default UserLineSubContent;

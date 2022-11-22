import React, { FC } from "react";
import { UserPropsType } from "./type";
// @ts-ignore
import styles from "./User.module.scss";

const User: FC<UserPropsType> = ({ username }) => {
  const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const res = username.split("").filter(function (l: any) {
    return ~caps.indexOf(l);
  });

  return (
    <div className={styles.user}>
      <div className={styles.user_Wrap}>
        <div className={styles.user_Img}>{res}</div>
        <p className={styles.user_Text}>{username}</p>
      </div>
    </div>
  );
};

export default User;

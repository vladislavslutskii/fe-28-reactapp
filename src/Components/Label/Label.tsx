import React, { FC } from "react";
import styles from "./Label.module.scss";
import classNames from "classnames";

type LabelProps = {
  title: string;
  required?: boolean;
};

const Label: FC<LabelProps> = ({ title, required }) => {
  return (
    <div
      className={classNames(styles.label, {
        [styles.required]: required,
      })}
    >
      {title}
    </div>
  );
};

export default Label;

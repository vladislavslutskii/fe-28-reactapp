import React from "react";
// @ts-ignore
import styles from "./Title.module.scss";

import classnames from "classnames";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";

const Title = ({ title }: any) => {
  const { theme, onChangeTheme } = useThemeContext();

  return (
    <div
      className={classnames(styles.title__Wrap, {
        [styles.title__WrapDark]: theme === Theme.Dark,
      })}
    >
      <h1>{title}</h1>
    </div>
  );
};
export default Title;

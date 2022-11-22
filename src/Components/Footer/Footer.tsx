import React from "react";
// @ts-ignore
import styles from "./Footer.module.scss";
import classnames from "classnames";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";

const Footer = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  return (
    <div
      className={classnames(styles.footer, {
        [styles.footer__Dark]: isDarkTheme,
      })}
    >
      <div
        className={classnames(styles.footerWrap, {
          [styles.footerWrap__Dark]: isDarkTheme,
        })}
      >
        <div
          className={classnames(styles.footerWrap__Watermark, {
            [styles.footerWrap__WaterMark__Dark]: isDarkTheme,
          })}
        >
          ©2022 Blogfolio
        </div>
        <div
          className={classnames(styles.footerWrap__textAllRights, {
            [styles.footerWrap__textAllRights__Dark]: isDarkTheme,
          })}
        >
          All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;

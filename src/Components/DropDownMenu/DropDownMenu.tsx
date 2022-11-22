import React, { useState } from "react";
// @ts-ignore
import styles from "./DropDownMenu.module.scss";
import classnames from "classnames";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";

const DropDownMenu = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  return (
    <div
      className={classnames(styles.DropDownMenu, {
        [styles.DropDownMenu__Dark]: isDarkTheme,
      })}
    >
      <ul
        className={classnames(styles.DropDownMenu__list, {
          [styles.DropDownMenu__list__Dark]: isDarkTheme,
        })}
      >
        <li
          className={classnames(styles.DropDownMenu__list__listItem, {
            [styles.DropDownMenu__list__listItem__Dark]: isDarkTheme,
          })}
        >
          <button
            className={classnames(styles.DropDownMenu__list__listItem__button, {
              [styles.DropDownMenu__list__listItem__button__Dark]: isDarkTheme,
            })}
          >
            Edit
          </button>
        </li>
        <li
          className={classnames(styles.DropDownMenu__list__listItem, {
            [styles.DropDownMenu__list__listItem__Dark]: isDarkTheme,
          })}
        >
          <button
            className={classnames(styles.DropDownMenu__list__listItem__button, {
              [styles.DropDownMenu__list__listItem__button__Dark]: isDarkTheme,
            })}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;

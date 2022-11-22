import React from "react";
// @ts-ignore
import styles from "./EmptyState.module.scss";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { PathNames } from "../../Pages/Router";

const EmptyState = () => {
  const { theme, onChangeTheme } = useThemeContext();
  return (
    <div
      className={classnames(styles.emptyStateWrap, {
        [styles.emptyStateWrap__Dark]: theme === Theme.Dark,
      })}
    >
      <div
        className={classnames(styles.emptyStateWrap__containerImg, {
          [styles.emptyStateWrap__containerImg__Dark]: theme === Theme.Dark,
        })}
      >
        <img
          src="https://keenthemes.ams3.digitaloceanspaces.com/market/images/doozy/doozy_free/20.png"
          alt="#"
        />
      </div>
      <div
        className={classnames(styles.emptyStateWrap__containerText, {
          [styles.emptyStateWrap__containerText__Dark]: theme === Theme.Dark,
        })}
      >
        <div className={styles.nothingFound}>
          Sorry, there`s nothing was found
        </div>
        <div className={styles.tryToAdjusting}>
          Try to adjusting your search
        </div>

        <Link
          to={PathNames.Home}
          className={classnames(styles.goHome, {
            [styles.goHome__Dark]: theme === Theme.Dark,
          })}
        >
          <div>Go Home</div>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;

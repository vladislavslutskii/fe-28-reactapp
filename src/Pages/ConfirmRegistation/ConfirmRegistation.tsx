import React from "react";

// @ts-ignore
import styles from "./ConfirmRegistation.module.scss";
import classnames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { Link, useParams } from "react-router-dom";
import Title from "../../Components/Title";
import { PathNames } from "../Router";
import Button from "../../Components/Button";
import { ButtonType } from "../../Components/Button/types";
import { useSelector } from "react-redux";
import authSelectors from "../../Redux/selectors/authSelectors";

const ConfirmRegistation = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const aasd = useSelector(authSelectors.getCurrentUser);
  console.log(aasd);

  return (
    <div
      className={classnames(styles.confirmRegistation, {
        [styles.confirmRegistation__Dark]: isDarkTheme,
      })}
    >
      <div
        className={classnames(styles.confirmRegistation__container, {
          [styles.confirmRegistation__container__Dark]: isDarkTheme,
        })}
      >
        <div className={styles.titleWrap}>
          <Link
            to={PathNames.Home}
            className={classnames(styles.titleWrap__backToHomeText, {
              [styles.titleWrap__backToHomeTextDark]: isDarkTheme,
            })}
          >
            Back to home
          </Link>
          <Title title={"Registration Confirmation"}></Title>
        </div>
        <div
          className={classnames(styles.formContainer, {
            [styles.formContainer__Dark]: isDarkTheme,
          })}
        >
          <div className={styles.buttonAndText}>
            <div className={styles.buttonAndText__text}>
              Please activate your account with the activation link in the email
              example@gmail.com.
              <p>Please, check your email</p>
            </div>

            <Link
              to={PathNames.Home}
              className={styles.buttonAndText__signUpButton}
            >
              <Button
                type={ButtonType.Primary}
                title={"Go to home"}
                className={styles.buttonAndText__signUpButton}
              ></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRegistation;

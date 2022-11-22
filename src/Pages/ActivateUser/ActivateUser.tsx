import React, { useEffect, useState } from "react";

// @ts-ignore
import styles from "./ActivateUser.module.scss";
import classnames from "classnames";
import { RegistrationStatus } from "../../Utils/globalTypes";
import { NavLink, useParams, Link } from "react-router-dom";
import { PathNames } from "../Router";
import { useDispatch } from "react-redux";
import { activateUser } from "../../Redux/reducers/authReducer";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import Title from "../../Components/Title";
import Button from "../../Components/Button";
import { ButtonType } from "../../Components/Button/types";

const ActivateUser = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const dispatch = useDispatch();
  const [registrationStatus, setRegistrationStatus] = useState(
    RegistrationStatus.Default
  );

  const handleStatus = (status: RegistrationStatus) => {
    setRegistrationStatus(status);
  };
  const params = useParams();

  useEffect(() => {
    if (params.uid && params.token) {
      dispatch(
        activateUser({
          params: { uid: params.uid, token: params.token },
          callback: handleStatus,
        })
      );
    } else {
      handleStatus(RegistrationStatus.Failed);
    }
  }, [params.token, params.uid]);
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
          {registrationStatus === RegistrationStatus.Success && (
            <Title title={"Success"}></Title>
          )}
          {registrationStatus === RegistrationStatus.Failed && (
            <Title title={"Failed"}></Title>
          )}
        </div>
        <div
          className={classnames(styles.formContainer, {
            [styles.formContainer__Dark]: isDarkTheme,
          })}
        >
          <div className={styles.buttonAndText}>
            <div className={styles.buttonAndText__text}>
              {registrationStatus === RegistrationStatus.Success && (
                <div
                  className={classnames({
                    [styles.text__Dark]: isDarkTheme,
                  })}
                >
                  <p>Thank your for registation</p>Registration successful,
                  please Log In
                </div>
              )}
              {registrationStatus === RegistrationStatus.Failed && (
                <div
                  className={classnames({
                    [styles.text__Dark]: isDarkTheme,
                  })}
                >
                  <p>Thank your for registation</p>
                  Registration failed, please try to Sign Up again.
                </div>
              )}
            </div>
            {registrationStatus === RegistrationStatus.Success && (
              <Link
                to={PathNames.SignIn}
                className={styles.buttonAndText__signUpButton}
              >
                <Button
                  type={ButtonType.Primary}
                  title={"Log In "}
                  className={styles.buttonAndText__signUpButton}
                ></Button>
              </Link>
            )}
            {registrationStatus === RegistrationStatus.Failed && (
              <Link
                to={PathNames.SignUp}
                className={styles.buttonAndText__signUpButton}
              >
                <Button
                  type={ButtonType.Primary}
                  title={"Sign Up"}
                  className={styles.buttonAndText__signUpButton}
                ></Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   {registrationStatus === RegistrationStatus.Success && (
    //     <div>
    //       Registration successful, please
    //       <NavLink to={PathNames.SignIn}> Log In </NavLink>
    //     </div>
    //   )}
    //   {registrationStatus === RegistrationStatus.Failed && (
    //     <div>
    //       Registration failed, please try to
    //       <NavLink to={PathNames.SignUp}> Sign Up </NavLink>
    //       again.
    //     </div>
    //   )}
    // </div>
  );
};
export default ActivateUser;

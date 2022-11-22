import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
//@ts-ignore
import styles from "./Menu.module.scss";

import User from "../../User/User";
import { useThemeContext, Theme } from "../../../Context/ThemeContext/Context";
import { DropListIconWhite, DropListIconDark } from "../../../Assets/Icons";
import { PathNames } from "../../../Pages/Router";
import classnames from "classnames";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import AuthSelectors from "../../../Redux/selectors/authSelectors";
import { ButtonType } from "../../Button/types";
import { logoutUser } from "../../../Redux/reducers/authReducer";

const Menu = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(AuthSelectors.getCurrentUser);
  const isAuthenticated = useSelector(AuthSelectors.getAuthStatus);

  const onLogOut = () => {
    dispatch(logoutUser());
  };
  return (
    <ul className={styles.listMenu}>
      {currentUser && isAuthenticated && (
        <li className={styles.listMenu__item__user}>
          <User username={currentUser?.username || ""}></User>
        </li>
      )}
      <li className={styles.listMenu__items}>
        <NavLink
          className={classnames(styles.navLink, {
            [styles.activeLink]: location.pathname === PathNames.Home,
          })}
          to={PathNames.Home}
        >
          Home
        </NavLink>
      </li>

      {currentUser ? (
        <li className={styles.listMenu__items}>
          <NavLink
            className={classnames(styles.navLink, {
              [styles.activeLink]: location.pathname === PathNames.NewPost,
            })}
            to={PathNames.NewPost}
          >
            Add post
          </NavLink>
        </li>
      ) : null}
      <li className={styles.listMenu__item__color}>
        <div className={styles.listMenu__item__blackButton}>
          <Button
            type={ButtonType.ButtonIcon}
            title={null}
            onClick={onChangeTheme}
            className={styles.iconsBlackButton}
            iconBefore={
              <DropListIconWhite width={`24`} height={`24`}></DropListIconWhite>
            }
            iconAfter={null}
            disabled={theme === Theme.Light ? true : undefined}
          ></Button>
        </div>
        <div className={styles.listMenu__item__whiteButton}>
          <Button
            type={ButtonType.ButtonIcon}
            title={null}
            onClick={onChangeTheme}
            className={styles.iconsBlackButton2}
            iconBefore={
              <DropListIconDark width={`24`} height={`24`}></DropListIconDark>
            }
            iconAfter={null}
            disabled={theme === Theme.Dark ? true : undefined}
          ></Button>
        </div>
      </li>

      {currentUser ? (
        <button className={styles.listMenu__button} onClick={onLogOut}>
          Log Out
        </button>
      ) : (
        <NavLink to={PathNames.SignIn}>
          <button className={styles.listMenu__button}>Sign In</button>
        </NavLink>
      )}
    </ul>
  );
};
export default Menu;

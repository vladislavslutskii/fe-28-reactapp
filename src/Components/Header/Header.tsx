import React, { useState, useEffect } from "react";

// @ts-ignore
import styles from "./Header.module.scss";
import Input from "../Input";
import User from "../User";
import {
  BurgerIconClose,
  BurgerIconOpen,
  HeaderSearch,
  UserIcon,
} from "../../Assets/Icons";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import AuthSelectors from "../../Redux//selectors/authSelectors";
import { useNavigate } from "react-router-dom";
import { PathNames } from "../../Pages/Router";
import { getUser } from "../../Redux/reducers/authReducer";
import { searchForPosts } from "../../Redux/reducers/postsReducer";

const Header = ({ onClick, isOpenedMenu }: any) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const onChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const currentUser = useSelector(AuthSelectors.getCurrentUser);

  const navigate = useNavigate();

  const onSignInClick = () => {
    navigate(PathNames.SignIn);
  };

  const onSearch = () => {
    if (value.length > 0) {
      dispatch(searchForPosts({ search: value, offset: 0, isOverwrite: true }));
      navigate(PathNames.Search, { state: { searchElement: value } });
      setValue("");
      onClick();
    }
  };

  //TODO сделать useEffect
  const isAuthenticated = useSelector(AuthSelectors.getAuthStatus);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   if (value.length > 0) {
  //     dispatch(searchForPosts(value));
  //   }
  // }, [value]);

  return (
    <nav className={styles.header}>
      <div className={styles.header__burger} onClick={onClick}>
        <div className={styles.burgerIcon}>
          {isOpenedMenu ? (
            <BurgerIconClose
              className={``}
              width={`25`}
              height={`25`}
            ></BurgerIconClose>
          ) : (
            <BurgerIconOpen
              className={``}
              width={`25`}
              height={`25`}
            ></BurgerIconOpen>
          )}
        </div>
      </div>
      {!isOpenedMenu ? null : (
        <Input
          className={styles.header__input}
          placeholder={"Search..."}
          onChange={onChange}
          value={value}
        />
      )}
      {isOpenedMenu && (
        <div className={styles.header__search} onClick={onSearch}>
          <HeaderSearch
            className={styles.header__search__icon}
            width={`24`}
            height={`24`}
          ></HeaderSearch>
        </div>
      )}
      <div className={styles.header__user}>
        {currentUser ? (
          <User username={currentUser?.username || ""}></User>
        ) : (
          <div className={styles.header__user__noIcon} onClick={onSignInClick}>
            <UserIcon width={24} height={24}></UserIcon>
          </div>
        )}
      </div>
      {isOpenedMenu && <Menu />}
    </nav>
  );
};
export default Header;

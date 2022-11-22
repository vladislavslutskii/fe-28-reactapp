import React, { FC } from "react";
// @ts-ignore

import styles from "./Post.module.scss";
import classnames from "classnames";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { Link, useParams } from "react-router-dom";
import { PathNames } from "../../Pages/Router";
import Button from "../Button";
import { CardIconDown, CardIconUp, CardIconBookmark } from "../../Assets/Icons";
import PaginatedItems from "../Paginate/Paginate";
import { ButtonType } from "../Button/types";
import { PostProps } from "./type";

const Post: FC<PostProps> = ({ post }) => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const { id, image, text, title } = post;

  return (
    <div
      className={classnames(styles.Post, {
        [styles.Post__Dark]: isDarkTheme,
      })}
    >
      <div
        className={classnames(styles.Post__container, {
          [styles.Post__container__Dark]: isDarkTheme,
        })}
      >
        <div className={styles.Post__container__buttonAndIDWrap}>
          <div className={styles.linkWrap}>
            <Link
              to={PathNames.Home}
              className={classnames(styles.linkWrap, {
                [styles.linkWrap__Dark]: isDarkTheme,
              })}
            >
              Home |
            </Link>
          </div>
          <div
            className={classnames(styles.idWrap, {
              [styles.idWrap__Dark]: isDarkTheme,
            })}
          >{`Post  ${id}`}</div>
        </div>
        <div
          className={classnames(styles.Post__container__titleWrap, {
            [styles.Post__container__titleWrap__Dark]: isDarkTheme,
          })}
        >
          {title}
        </div>
        <div className={styles.Post__container__imgWrap}>
          <img
            className={styles.Post__container__imgWrap__img}
            src={image}
            alt={image}
          />
        </div>
        <div className={styles.Post__container__textWrap}>
          <div
            className={classnames(styles.Post__container__textWrap__text, {
              [styles.Post__container__textWrap__text__Dark]: isDarkTheme,
            })}
          >
            {text}
          </div>
        </div>
        <div className={styles.Post__container__buttonsWrap}>
          <div className={styles.Post__container__buttonsWrap__rightSide}>
            <Button
              type={ButtonType.ButtonIcon}
              title={null}
              onClick={() => alert(`Я кнопка - иконка(Лайк)`)}
              className={styles.ButtonIconLike}
              iconBefore={<CardIconUp width={24} height={24}></CardIconUp>}
              iconAfter={null}
            ></Button>
            <Button
              type={ButtonType.ButtonIcon}
              title={null}
              onClick={() => alert(`Я кнопка - иконка(Дизлайк)`)}
              className={styles.ButtonIconDis}
              iconBefore={<CardIconDown width={24} height={24}></CardIconDown>}
              iconAfter={null}
            ></Button>
          </div>
          <Button
            type={ButtonType.ButtonWIcon}
            title={`Add to favorites`}
            onClick={() => alert(`Я кнопка Secondary c иконкой`)}
            className={styles.ButtonWIcon}
            iconBefore={
              <CardIconBookmark
                className={styles.Book}
                width={24}
                height={24}
              ></CardIconBookmark>
            }
            iconAfter={null}
          ></Button>
        </div>
        <PaginatedItems itemsPerPage={4}></PaginatedItems>
      </div>
    </div>
  );
};
export default Post;

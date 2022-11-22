import React, { useState, FC } from "react";
// @ts-ignore
import styles from "./CardSearch.module.scss";
import classnames from "classnames";

import {
  CardIconUp,
  CardIconDown,
  CardIconBookmark,
  CardIconDots,
  CardIconBookmarkblack,
} from "../../Assets/Icons";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavouritePost,
  setLikeStatus,
  setLikeStatusSearch,
  setPostModalImgVisible,
  setSelectedPost,
  setSinglePostModalVisible,
} from "../../Redux/reducers/postsReducer";
import { CardListType, CardPostType, LikeStatus } from "../../Utils";
import PostsSelectors from "../../Redux/selectors/postsSelectors";

export type CardSearchProps = {
  post: CardPostType;
};

const CardSearch: FC<CardSearchProps> = ({ post }) => {
  const { image, text, date, title, id, likeStatus } = post;

  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const dispatch = useDispatch();

  const onOpenPost = () => {
    dispatch(setSelectedPost(post));
  };

  const onOpenModal = () => {
    dispatch(setSinglePostModalVisible(true));
    dispatch(setSelectedPost(post));
  };
  const onOpenModalImg = () => {
    dispatch(setPostModalImgVisible(true));
    dispatch(setSelectedPost(post));
  };

  const favouritePostsList: CardListType = useSelector(
    PostsSelectors.getFavoritePosts
  );

  const currentPostIndex = favouritePostsList.findIndex(
    (post) => post.id === id
  );
  const isFavorite = currentPostIndex !== -1;

  const onAddFavourite = (event: any) => {
    event.stopPropagation();
    dispatch(setFavouritePost(post));
  };

  const onStatusClick = (status: LikeStatus) => {
    dispatch(setLikeStatusSearch({ status, id }));
  };

  return (
    <div
      className={classnames(styles.post, {
        [styles.darkPost]: theme === Theme.Dark,
      })}
    >
      <div
        className={classnames(styles.card, {
          [styles.card__Dark]: theme === Theme.Dark,
        })}
      >
        <div className={styles.card__wrap}>
          <div className={styles.card__wrap__imgWrap} onClick={onOpenPost}>
            <img
              className={styles.card__wrap__imgWrap__img}
              src={image}
              alt="#"
              onClick={onOpenModalImg}
            />
          </div>
          <div className={styles.card__wrap__textWrap}>
            <div className={styles.card__wrap__textWrap__DateATitle}>
              <p className={styles.card__wrap__textWrap__Date}>{date}</p>
              <h1
                className={classnames(styles.card__wrap__textWrap__Title, {
                  [styles.card__wrap__textWrap__Title__Dark]:
                    theme === Theme.Dark,
                })}
              >
                {title}
              </h1>
            </div>
          </div>
        </div>
        <div
          className={classnames(styles.card__icons, {
            [styles.card__icons__Dark]: isDarkTheme,
          })}
        >
          <div className={styles.card__icons__left}>
            <div
              onClick={() => onStatusClick(LikeStatus.Like)}
              className={classnames(
                styles.likeStatusButton,
                {
                  [styles.like]: likeStatus === LikeStatus.Like,
                },
                { [styles.like__Dark]: isDarkTheme }
              )}
            >
              <CardIconUp width={`24`} height={`24`}></CardIconUp>
              <div className={styles.likeStatus}>
                {likeStatus === LikeStatus.Like && 1}
              </div>
            </div>
            <div
              onClick={() => onStatusClick(LikeStatus.Dislike)}
              className={classnames(
                styles.disLikeStatusButton,
                {
                  [styles.disLike]: likeStatus === LikeStatus.Dislike,
                },
                { [styles.disLike__Dark]: isDarkTheme }
              )}
            >
              <CardIconDown width={`24`} height={`24`}></CardIconDown>
              <div className={styles.disLikeStatus}>
                {likeStatus === LikeStatus.Dislike && 1}
              </div>
            </div>
          </div>
          <div className={styles.card__icons__right}>
            <div
              className={classnames(styles.card__icons__right__save, {
                [styles.favouritePost]: isFavorite,
              })}
              onClick={onAddFavourite}
            >
              {isFavorite ? (
                <CardIconBookmarkblack
                  width={`24`}
                  height={`24`}
                ></CardIconBookmarkblack>
              ) : (
                <CardIconBookmark width={`24`} height={`24`}></CardIconBookmark>
              )}
            </div>
            <div className="div" onClick={onOpenModal}>
              <CardIconDots width={`24`} height={`24`}></CardIconDots>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSearch;

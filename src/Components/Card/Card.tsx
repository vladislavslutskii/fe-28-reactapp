import React, { FC, MouseEvent } from "react";
import styles from "./Card.module.scss";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { CardSize } from "../CardsList";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import {
  CardIconUp,
  CardIconDown,
  CardIconBookmark,
  CardIconDots,
  CardIconBookmarkblack,
} from "../../Assets/Icons";

import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { useNavigate } from "react-router-dom";
import {
  setFavouritePost,
  setLikeStatus,
  setPostModalImgVisible,
  setSelectedPost,
  setSinglePostModalVisible,
} from "../../Redux/reducers/postsReducer";

import { CardPostProps } from "./types";
import { CardListType, LikeStatus } from "../../Utils/globalTypes";
import PostsSelectors from "../../Redux/selectors/postsSelectors";

const Card: FC<CardPostProps> = ({ post, size, isMyPosts }) => {
  const { image, text, date, title, id, likeStatus } = post;
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCardClick = () => {
    navigate(`/content/${id}`);
  };
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

  const onAddFavourite = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(setFavouritePost(post));
  };

  const onStatusClick = (status: LikeStatus) => {
    dispatch(setLikeStatus({ status, id }));
  };

  const onClickEdit = () => {
    navigate(`/posts/${id}/edit`, { state: { post } });
  };
  return (
    <div
      className={classnames(styles.post, {
        [styles.largePost]: size === CardSize.Large,
        [styles.mediumPost]: size === CardSize.Medium,
        [styles.smallPost]: size === CardSize.Small,
        [styles.darkPost]: theme === Theme.Dark,
      })}
    >
      <div
        className={classnames(styles.card, {
          [styles.card__Dark]: isDarkTheme,
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
                onClick={onCardClick}
                className={classnames(styles.card__wrap__textWrap__Title, {
                  [styles.card__wrap__textWrap__Title__Dark]: isDarkTheme,
                })}
              >
                {title}
              </h1>
            </div>
            {size === CardSize.Large && (
              <div className={styles.card__wrap__textWrap__wrap}>
                <p className={styles.card__wrap__textWrap__wrap__text}>
                  {text}
                </p>
              </div>
            )}
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
              <Popup
                on={["hover"]}
                trigger={
                  <div>
                    <CardIconDots width={`24`} height={`24`}></CardIconDots>
                  </div>
                }
                position={"top center"}
              >
                <div className={styles.popupContainer}>
                  <div onClick={onOpenModal}>Preview post</div>
                  {isMyPosts && <div onClick={onClickEdit}>Edit post</div>}
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

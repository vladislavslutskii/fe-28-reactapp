import React, { FC } from "react";
// @ts-ignore
import styles from "./CardsList.module.scss";
import classnames from "classnames";

import Card from "../Card/Card";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { CardListProps } from "./types";

export enum CardSize {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

const CardsList: FC<CardListProps> = ({ cardList, isMyPosts }) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  return (
    <div
      className={classnames(styles.listWrap, {
        [styles.listWrap__Dark]: isDarkTheme,
      })}
    >
      <div className={styles.listWrap__leftSide}>
        {cardList[0] && (
          <div className={styles.listWrap__leftSide__LargeCard}>
            <Card
              post={cardList[0]}
              size={CardSize.Large}
              isMyPosts={isMyPosts}
            />
          </div>
        )}
        <div className={styles.listWrap__leftSide__MediumCards}>
          {cardList.map((post, id) => {
            if (id > 0 && id < 5) {
              return (
                <Card
                  post={post}
                  key={post.id}
                  size={CardSize.Medium}
                  isMyPosts={isMyPosts}
                />
              );
            }
          })}
        </div>
      </div>
      <div className={styles.listWrap__rightSide}>
        <div className={styles.listWrap__rightSide__SmallCards}>
          {cardList.map((post, id) => {
            if (id >= 5) {
              return (
                <Card
                  post={post}
                  key={post.id}
                  size={CardSize.Small}
                  isMyPosts={isMyPosts}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CardsList;

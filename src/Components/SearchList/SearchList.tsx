import React, { FC } from "react";
// @ts-ignore
import styles from "./SearchList.module.scss";
import classnames from "classnames";
import CardSearch from "../CardSearch";

import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { CardListType } from "../../Utils";
import EmptyState from "../EmptyState";
import InfiniteScroll from "react-infinite-scroll-component";

type SearchListProps = {
  searchedPosts: CardListType;
  count: number;
  onScroll: () => void;
};

const SearchList: FC<SearchListProps> = ({
  searchedPosts,
  count,
  onScroll,
}) => {
  const hasMore = searchedPosts.length < count;
  const { theme, onChangeTheme } = useThemeContext();

  return searchedPosts && searchedPosts.length > 0 ? (
    <div
      className={classnames(styles.listWrap, {
        [styles.listWrap__Dark]: theme === Theme.Dark,
      })}
    >
      <InfiniteScroll
        next={onScroll}
        hasMore={hasMore}
        dataLength={searchedPosts.length}
        loader={<h1>{"LOADING"}</h1>}
        scrollThreshold={0.9}
      >
        {searchedPosts.map((post) => {
          return <CardSearch post={post} key={post.id} />;
        })}
      </InfiniteScroll>
    </div>
  ) : (
    <EmptyState></EmptyState>
  );
};

export default SearchList;

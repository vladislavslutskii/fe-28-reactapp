import React, { useEffect, useState } from "react";
// @ts-ignore
import styles from "./Search.module.scss";
import classnames from "classnames";
import PaginatedItems from "../../Components/Paginate/Paginate";

import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import SearchList from "../../Components/SearchList";
import { useLocation, useNavigate } from "react-router-dom";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import { useDispatch, useSelector } from "react-redux";
import PostModalImg from "../Blog/Components/PostModalImg";
import SinglePostModal from "../Blog/Components/SinglePostModal";
import Lottie from "lottie-react";
import animation from "../../lotties/transfer.json";
import { PathNames } from "../Router";
import { DEFAULT_PAGE_NUMBER, PER_PAGE } from "../../Utils";
import { searchForPosts } from "../../Redux/reducers/postsReducer";

type LocationState = {
  searchElement: string;
};

const Search = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchElement } = location.state as LocationState;

  const searchedPosts = useSelector(PostsSelectors.getSearchedPosts);
  const isSearchPostsLoading = useSelector(
    PostsSelectors.getSearchedPostsLoading
  );
  const searchString = useSelector(PostsSelectors.getSearchStrng);
  const searchedPostsCount = useSelector(PostsSelectors.getSearchedPostsCount);

  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);

  useEffect(() => {
    if (searchElement.length === 0) {
      navigate(PathNames.Home);
    }
  }, [searchElement]);

  useEffect(() => {
    const offset = (page - 1) * PER_PAGE;
    dispatch(
      searchForPosts({ search: searchElement, offset, isOverwrite: false })
    );
  }, [page]);

  const onScroll = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div
      className={classnames(styles.Search, {
        [styles.Search__Dark]: isDarkTheme,
      })}
    >
      <PostModalImg></PostModalImg>
      <SinglePostModal></SinglePostModal>
      <div
        className={classnames(styles.Search__container, {
          [styles.Search__container__Dark]: isDarkTheme,
        })}
      >
        <div className={styles.Search__container__CardsListWrap}>
          {!isSearchPostsLoading && searchedPosts.length > 0 ? (
            <div
              className={classnames(styles.titleWrap, {
                [styles.titleWrap__Dark]: theme === Theme.Dark,
              })}
            >
              Search result "{searchElement}"
            </div>
          ) : null}
          {!isSearchPostsLoading ? (
            <SearchList
              searchedPosts={searchedPosts}
              count={searchedPostsCount}
              onScroll={onScroll}
            />
          ) : (
            <div className={styles.lottie__container}>
              <Lottie
                className={styles.lottie__container__animation}
                animationData={animation}
                loop={true}
              ></Lottie>
            </div>
          )}
        </div>
        {!isSearchPostsLoading && !searchedPosts ? (
          <div className={styles.Search__container__Paginate}>
            <PaginatedItems itemsPerPage={4}></PaginatedItems>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;

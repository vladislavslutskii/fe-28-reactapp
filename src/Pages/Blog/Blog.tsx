import React, { useEffect, useMemo, useState } from "react";

// @ts-ignore
import styles from "./Blog.module.scss";
import classnames from "classnames";
import Title from "../../Components/Title";
import CardsList from "../../Components/CardsList";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPosts,
  getPosts,
  setActiveTab,
} from "../../Redux/reducers/postsReducer";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import Tabs2 from "../../Components/Tabs";
import { SortOrder, TabsNames } from "../../Utils/globalTypes";
import SinglePostModal from "./Components/SinglePostModal";
import PostModalImg from "./Components/PostModalImg";
import Lottie from "lottie-react";
import animation from "../../lotties/transfer.json";
import AuthSelectors from "../../Redux/selectors/authSelectors";
import ReactPaginate from "react-paginate";
import { DEFAULT_PAGE_NUMBER, PER_PAGE } from "../../Utils";
import { ArrowLeft, ArrowRight } from "../../Assets/Icons";
import Paginate from "../../Components/Paginate";

// const POST_MOCK = [
//   {
//     id: 1,
//     image:
//       "https://cdn.pixabay.com/photo/2015/12/05/08/25/fantasy-1077863__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",

//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 2,
//     image:
//       "https://cdn.pixabay.com/photo/2017/02/08/12/46/moon-2048727__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 3,
//     image:
//       "https://cdn.pixabay.com/photo/2016/10/30/20/22/astronaut-1784245__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 4,
//     image:
//       "https://cdn.pixabay.com/photo/2022/03/10/13/59/astronaut-7059915__340.png",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",

//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 5,
//     image:
//       "https://cdn.pixabay.com/photo/2016/11/19/20/16/astronaut-1840936__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 6,
//     image:
//       "https://cdn.pixabay.com/photo/2018/04/22/05/29/star-3340185__340.png",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 7,
//     image:
//       "https://cdn.pixabay.com/photo/2012/10/10/11/06/moon-walk-60616__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 8,
//     image:
//       "https://cdn.pixabay.com/photo/2019/09/06/10/36/astronaut-4456106__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 9,
//     image:
//       "https://cdn.pixabay.com/photo/2016/11/22/14/41/astronaut-1849402__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 10,
//     image:
//       "https://cdn.pixabay.com/photo/2012/10/25/23/40/moon-landing-62879__340.jpg",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
//   {
//     id: 11,
//     image:
//       "https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416__340.png",
//     text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
//     date: "April 20, 2021",
//     title:
//       "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//   },
// ];

// const TABS_NAME = [
//   {
//     key: TabsNames.All,
//     title: "All",
//     //   disabled: true,
//   },
//   {
//     key: TabsNames.Favorites,
//     title: "My favorites",
//     //   disabled: true,
//   },
//   {
//     key: TabsNames.Popular,
//     title: "Popular",
//     //   disabled: true,
//   },
// ];
// { isMyPosts }: any
const Blog = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const dispatch = useDispatch();

  const activeTab = useSelector(PostsSelectors.getActiveTab);
  const onTabClick = (id: TabsNames) => {
    dispatch(setActiveTab(id));
  };

  //   isMyPosts ? PostsSelectors.getMyPosts : PostsSelectors.getCardsList
  // );
  const cardsList = useSelector(PostsSelectors.getCardsList);
  const isPostsLoading = useSelector(PostsSelectors.getPostsLoading);
  //   // dispatch(setCardsList(POST_MOCK));
  //   dispatch(getMyPosts());
  //   // dispatch(getPosts());
  // }, []);

  const isAuthenticated = useSelector(AuthSelectors.getAuthStatus);

  const tabs = useMemo(
    () => [
      {
        key: TabsNames.All,
        title: "All",
        disabled: false,
      },
      {
        key: TabsNames.MyPosts,
        title: "My posts",
        disabled: !isAuthenticated,
      },
      {
        key: TabsNames.Favorites,
        title: "My favorites",
        disabled: !isAuthenticated,
      },
      {
        key: TabsNames.Popular,
        title: "Popular",
        disabled: !isAuthenticated,
      },
    ],
    [isAuthenticated]
  );

  const isMyPosts = activeTab === TabsNames.MyPosts;

  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER); // DEFAULT_PAGE_NUMBER === 1
  const [order, setOrder] = useState(SortOrder.Title);

  const cardsCount = useSelector(PostsSelectors.getCardsCount); // Сколько у нас всего постов тусуется на сервере
  const pagesCount = Math.ceil(cardsCount / PER_PAGE);

  useEffect(() => {
    const offset = (page - 1) * PER_PAGE;
    dispatch(isMyPosts ? getMyPosts() : getPosts({ offset, ordering: order }));
  }, [page, isMyPosts, order]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div
      className={classnames(styles.Blog, {
        [styles.Blog__Dark]: isDarkTheme,
      })}
    >
      <PostModalImg></PostModalImg>
      <SinglePostModal></SinglePostModal>
      <div
        className={classnames(styles.Blog__container, {
          [styles.Blog__container__Dark]: isDarkTheme,
        })}
      >
        <div
          className={classnames(styles.Blog__container__titleWrap, {
            [styles.Blog__container__titleWrap__Dark]: isDarkTheme,
          })}
        >
          {!isPostsLoading ? <Title title={"Blog"}></Title> : null}
        </div>
        <div
          className={classnames(styles.Blog__container__selectWrap, {
            [styles.Blog__container__selectWrap__Dark]: isDarkTheme,
          })}
        >
          {!isPostsLoading ? (
            <select
              value={order}
              onChange={(event: any) => setOrder(event.target.value)}
              className={classnames(styles.Blog__container__select, {
                [styles.Blog__container__select__Dark]: isDarkTheme,
              })}
            >
              <option
                value={SortOrder.Date}
                className={classnames(styles.Blog__container__selectOption, {
                  [styles.Blog__container__selectOption__Dark]: isDarkTheme,
                })}
              >
                Date
              </option>
              <option
                value={SortOrder.Title}
                className={classnames(styles.Blog__container__selectOption, {
                  [styles.Blog__container__selectOption__Dark]: isDarkTheme,
                })}
              >
                Title
              </option>
            </select>
          ) : null}
        </div>
        <div className={styles.Blog__container__tabWrap}>
          {!isPostsLoading ? (
            <Tabs2
              tabs={tabs}
              onClick={onTabClick}
              activeTab={activeTab}
            ></Tabs2>
          ) : null}
        </div>
        <div className={styles.Blog__container__CardsListWrap}>
          {!isPostsLoading ? (
            <CardsList cardList={cardsList} isMyPosts={isMyPosts} />
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
        <div className={styles.Blog__container__Paginate}>
          <Paginate
            pagesCount={pagesCount}
            onPageChange={onPageChange}
            page={page}
          ></Paginate>
        </div>
      </div>
    </div>
  );
};

export default Blog;

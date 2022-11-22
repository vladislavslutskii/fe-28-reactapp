import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CardListType,
  CardPostType,
  DeletePostPayload,
  GetPostsPayload,
  ISaveEditedPostPayload,
  ISavePostPayload,
  LikeStatus,
  SearchPostsPayload,
  SetSearchedPostsPayload,
  TabsNames,
} from "../../Utils";

type PostStateType = {
  selectedPost: CardPostType | null;
  cardsList: CardListType | [];
  activeTab: TabsNames;
  favouritePostsList: CardListType;
  singlePostModalVisible: boolean;
  postModalImgVisible: boolean;
  singlePost: CardPostType | null;
  isPostLoading: boolean;
  isSearchPostsLoading: boolean;
  searchedPosts: CardListType;
  isPostsLoading: boolean;
  searchString: string;
  cardsCount: number;
  searchedPostsCount: number;
};

const INITIAL_STATE: PostStateType = {
  selectedPost: null,
  cardsList: [],
  activeTab: TabsNames.All,
  favouritePostsList: [],
  singlePostModalVisible: false,
  postModalImgVisible: false,
  singlePost: null,
  isPostLoading: false,
  isSearchPostsLoading: false,
  searchedPosts: [],
  isPostsLoading: false,
  searchString: ``,
  cardsCount: 0,
  searchedPostsCount: 0,
};

const postsReducer = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    getPosts: (state, action: PayloadAction<GetPostsPayload>) => {},
    setPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostsLoading = action.payload;
    },
    getMyPosts: (state, action: PayloadAction<undefined>) => {},
    getSinglePost: (state, action: PayloadAction<string>) => {},
    setSinglePost: (state, action: PayloadAction<CardPostType>) => {
      state.singlePost = action.payload;
    },
    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostLoading = action.payload;
    },
    setSinglePostModalVisible: (state, action: PayloadAction<boolean>) => {
      state.singlePostModalVisible = action.payload;
    },
    setPostModalImgVisible: (state, action: PayloadAction<boolean>) => {
      state.postModalImgVisible = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<CardPostType | null>) => {
      state.selectedPost = action.payload;
    },
    setCardsList: (state, action: PayloadAction<CardListType>) => {
      state.cardsList = action.payload.map((card) => {
        return {
          ...card,
          likeStatus: null,
        };
      });
    },
    setFavouritePost: (state, action: PayloadAction<CardPostType>) => {
      const { id } = action.payload;
      const postIndex = state.favouritePostsList.findIndex(
        (post) => post.id === id
      );
      if (postIndex === -1) {
        state.favouritePostsList.push(action.payload);
      } else {
        state.favouritePostsList.splice(postIndex, 1);
      }
    },

    setLikeStatusSearch: (
      state,
      action: PayloadAction<{ status: LikeStatus; id: number }>
    ) => {
      const post = state.searchedPosts.find((c) => c.id === action.payload.id);
      const postIndex = state.searchedPosts.findIndex(
        (c) => c.id === action.payload.id
      );
      //тут мы просто доп проверяем, нашел ли у нас find в массиве общих постов нужный нам
      if (post && postIndex !== -1) {
        //Если уже стоит лайк или дизлайк - убрать его и поставить null
        if (post.likeStatus === action.payload.status) {
          state.searchedPosts.splice(postIndex, 1, {
            ...post,
            likeStatus: null,
          });
        } else {
          //Иначе дать ему актуальный статус
          state.searchedPosts.splice(postIndex, 1, {
            ...post,
            likeStatus: action.payload.status,
          });
        }
      }
    },
    setLikeStatus: (
      state,
      action: PayloadAction<{ status: LikeStatus; id: number }>
    ) => {
      const post = state.cardsList.find((c) => c.id === action.payload.id);
      const postIndex = state.cardsList.findIndex(
        (c) => c.id === action.payload.id
      );
      //тут мы просто доп проверяем, нашел ли у нас find в массиве общих постов нужный нам
      if (post && postIndex !== -1) {
        //Если уже стоит лайк или дизлайк - убрать его и поставить null
        if (post.likeStatus === action.payload.status) {
          state.cardsList.splice(postIndex, 1, {
            ...post,
            likeStatus: null,
          });
        } else {
          //Иначе дать ему актуальный статус
          state.cardsList.splice(postIndex, 1, {
            ...post,
            likeStatus: action.payload.status,
          });
        }
      }
    },
    setActiveTab: (state, action: PayloadAction<TabsNames>) => {
      state.activeTab = action.payload;
    },
    setCardsCount: (state, action: PayloadAction<number>) => {
      state.cardsCount = action.payload;
    },
    setSearchPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchPostsLoading = action.payload;
    },
    setSearchedPosts: (
      state,
      action: PayloadAction<SetSearchedPostsPayload>
    ) => {
      const { isOverwrite, data } = action.payload;
      if (isOverwrite) {
        state.searchedPosts = data;
      } else {
        state.searchedPosts.push(...data);
      }
    },
    setSearchedPostsCount: (state, action: PayloadAction<number>) => {
      state.searchedPostsCount = action.payload;
    },
    searchForPosts: (state, action: PayloadAction<SearchPostsPayload>) => {},
    addNewPost: (state, action: PayloadAction<ISavePostPayload>) => {},
    saveEditedPost: (
      state,
      action: PayloadAction<ISaveEditedPostPayload>
    ) => {},
    deletePost: (state, action: PayloadAction<DeletePostPayload>) => {},
  },
});

export default postsReducer.reducer;

export const {
  setSelectedPost,
  setCardsList,
  setFavouritePost,
  setLikeStatus,
  setActiveTab,
  setSinglePostModalVisible,
  setPostModalImgVisible,
  setSinglePost,
  setSinglePostLoading,
  getPosts,
  getSinglePost,
  getMyPosts,
  searchForPosts,
  setSearchPostsLoading,
  setSearchedPosts,
  setPostsLoading,
  setLikeStatusSearch,
  setCardsCount,
  setSearchedPostsCount,
  addNewPost,
  saveEditedPost,
  deletePost,
} = postsReducer.actions;

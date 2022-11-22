export default {
  getSelectedPost: (state: any) => state.postsReducer.selectedPost,
  getActiveTab: (state: any) => state.postsReducer.activeTab,
  getCardsList: (state: any) => state.postsReducer.cardsList,
  getFavoritePosts: (state: any) => state.postsReducer.favouritePostsList,
  getIsModalVisible: (state: any) => state.postsReducer.singlePostModalVisible,
  getIsModalImgVisible: (state: any) => state.postsReducer.postModalImgVisible,
  getSinglePost: (state: any) => state.postsReducer.singlePost,
  getSinglePostLoading: (state: any) => state.postsReducer.isPostLoading,
  getMyPosts: (state: any) => state.postsReducer.cardsList,
  getSearchedPostsLoading: (state: any) =>
    state.postsReducer.isSearchPostsLoading,
  getSearchedPosts: (state: any) => state.postsReducer.searchedPosts,
  getPostsLoading: (state: any) => state.postsReducer.isPostsLoading,
  getSearchStrng: (state: any) => state.postsReducer.searchString,
  getCardsCount: (state: any) => state.postsReducer.cardsCount,
  getSearchedPostsCount: (state: any) => state.postsReducer.searchedPostsCount,
};

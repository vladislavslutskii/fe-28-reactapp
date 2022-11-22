import { all, call, takeLatest, put } from "redux-saga/effects";

import {
  addNewPost,
  deletePost,
  getMyPosts,
  getPosts,
  getSinglePost,
  saveEditedPost,
  searchForPosts,
  setCardsCount,
  setCardsList,
  setPostsLoading,
  setSearchedPosts,
  setSearchedPostsCount,
  setSearchPostsLoading,
  setSinglePost,
  setSinglePostLoading,
} from "../reducers/postsReducer";
import Api from "../api";
import { PayloadAction } from "@reduxjs/toolkit";
import callCheckingAuth from "./callCheckingAuth";
import {
  DeletePostPayload,
  GetPostsPayload,
  ISaveEditedPostPayload,
  ISavePostPayload,
  SearchPostsPayload,
} from "../../Utils";

function* getPostsWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setPostsLoading(true));
  const { offset, ordering } = action.payload;
  const { data, status, problem } = yield call(
    Api.getPostsList,
    offset,
    ordering
  );
  if (status === 200 && data) {
    yield put(setCardsCount(data.count));
    yield put(setCardsList(data.results));
  } else {
    console.log(problem);
  }
  yield put(setPostsLoading(false));
}

function* getMyPostsWorker() {
  const { data, status, problem } = yield callCheckingAuth(Api.getMyPostsList);
  if (status === 200 && data) {
    yield put(setCardsList(data));
  } else if (status === 400) {
    yield put(setCardsList([]));
  } else {
    console.log(problem, data);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const { data, status, problem } = yield call(Api.getPost, action.payload);
  if (status === 200 && data) {
    yield put(setSinglePost(data));
  } else {
    console.log(problem);
  }
  yield put(setSinglePostLoading(false));
}

function* getSearchedPostsWorker(action: PayloadAction<SearchPostsPayload>) {
  const { offset, isOverwrite, search } = action.payload;

  yield put(setSearchPostsLoading(isOverwrite));
  const { data, status, problem } = yield call(
    Api.getSearchedPosts,
    search,
    offset
  );
  if (status === 200 && data) {
    yield put(setSearchedPostsCount(data.count));
    yield put(setSearchedPosts({ data: data.results, isOverwrite }));
  } else {
    console.log("Error getting search posts", problem);
  }
}

function* addNewPostWorker(action: PayloadAction<ISavePostPayload>) {
  const { formData, callback } = action.payload;
  const { status, problem } = yield callCheckingAuth(Api.addNewPost, formData);

  if (status === 201) {
    callback();
  } else {
    console.log("problem", problem);
  }
}

function* editPostWorker(action: PayloadAction<ISaveEditedPostPayload>) {
  const { id, formData, callback } = action.payload;
  const { status, problem } = yield callCheckingAuth(
    Api.saveEditedPost,
    id,
    formData
  );

  if (status === 200) {
    callback();
  } else {
    console.log("problem", problem);
  }
}
function* deletePostWorker(action: PayloadAction<DeletePostPayload>) {
  const { id, callback } = action.payload;
  const { status, problem } = yield callCheckingAuth(Api.deletePost, id);

  if (status === 204) {
    callback();
  } else {
    console.log("problem", problem);
  }
}

export default function* postsSagaWatcher() {
  yield all([
    takeLatest(getPosts, getPostsWorker),
    takeLatest(searchForPosts, getSearchedPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(addNewPost, addNewPostWorker),
    takeLatest(saveEditedPost, editPostWorker),
    takeLatest(deletePost, deletePostWorker),
  ]);
}

import React from "react";

// @ts-ignore
import styles from "./SinglePostModal.module.scss";
import ModalWindow from "../../../../Components/ModalWindow/ModalWindow";
import Card from "../../../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import PostsSelectors from "../../../../Redux/selectors/postsSelectors";
import { CardSize } from "../../../../Components/CardsList";
import {
  setSelectedPost,
  setSinglePostModalVisible,
} from "../../../../Redux/reducers/postsReducer";

const SinglePostModal = () => {
  const post = useSelector(PostsSelectors.getSelectedPost);
  const isVisible = useSelector(PostsSelectors.getIsModalVisible);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setSinglePostModalVisible(!isVisible));
    dispatch(setSelectedPost(null));
  };

  return post ? (
    <ModalWindow active={isVisible} closeModal={onClose}>
      <Card size={CardSize.Large} post={post}></Card>
    </ModalWindow>
  ) : null;
};

export default SinglePostModal;

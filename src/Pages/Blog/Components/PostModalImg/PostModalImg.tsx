import React from "react";

// @ts-ignore
import styles from "./PostModalImg.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PostsSelectors from "../../../../Redux/selectors/postsSelectors";
import {
  setPostModalImgVisible,
  setSelectedPost,
} from "../../../../Redux/reducers/postsReducer";
import ModalWindow from "../../../../Components/ModalWindow/ModalWindow";
const PostModalImg = () => {
  const post = useSelector(PostsSelectors.getSelectedPost);
  const isVisible = useSelector(PostsSelectors.getIsModalImgVisible);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setPostModalImgVisible(!isVisible));
    dispatch(setSelectedPost(null));
  };
  return post ? (
    <ModalWindow active={isVisible} closeModal={onClose}>
      <img className={styles.modalImg} src={post.image} alt="" />
    </ModalWindow>
  ) : null;
};
export default PostModalImg;

export enum TabsNames {
  All = "all",
  Favorites = "favorites",
  Popular = "popular",
  MyPosts = "myPosts",
}
export enum LikeStatus {
  Like = "like",
  Dislike = "dislike",
}

export type CardPostType = {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  author: number;
  likeStatus?: LikeStatus | null;
};
export type CardListType = Array<CardPostType>;

export type UserActionPayload = {
  username: string;
  password: string;
  email: string;
};
export type ActivationParams = { uid: string; token: string };

export type ActivateUserPayload = {
  params: ActivationParams;
  callback: (status: RegistrationStatus) => void;
};
export enum RegistrationStatus {
  Success = `success`,
  Failed = `failed`,
  Default = `default`,
}

export type AuthUserPayload = {
  email: string;
  password: string;
};
export type setUserPayload = {
  username: string;
  id: number;
  email: string;
};

export type GetPostsPayload = {
  offset: number;
  ordering: string;
};

export type SearchPostsPayload = {
  search: string;
  offset: number;
  isOverwrite: boolean;
};
export type SetSearchedPostsPayload = {
  data: CardListType;
  isOverwrite: boolean;
};
export enum SortOrder {
  Date = "date",
  Title = "title",
}
export type AddNewPostPayload = { formData: any; callback: () => void };

export interface ISavePostPayload {
  formData: any;
  callback: () => void;
}

export interface ISaveEditedPostPayload extends ISavePostPayload {
  id: string;
}

export type DeletePostPayload = {
  id: string;
  callback: () => void;
};
